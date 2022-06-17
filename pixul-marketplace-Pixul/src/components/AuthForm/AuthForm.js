import { useRef, useState } from "react";
import { useHistory } from "react-router-dom";

import { CaretRightOutlined, RightOutlined } from "@ant-design/icons";
import { Form, Input, Button, Checkbox } from "antd";

import { auth } from "../../firebase";
import {
  signInWithEmailAndPassword,
  setPersistence,
  browserSessionPersistence,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";

import MetaMaskOnboarding from "@metamask/onboarding";
import {
  createBasicUser,
  verifyWalletUser,
} from "../../utils/verifyWalletUser";
import Cookies from "universal-cookie";
import { fetchUserInfo } from "../../utils/fetchUser";

import "./auth.css";

export const AuthForm = ({
  isSignIn,
  setIsFillingStoredInformation,
  setAuthState,
  setAuthStateContext,
}) => {
  const [error, setError] = useState(null);
  const [walletSignUp, setWalletSignUp] = useState(false);
  const history = useHistory();

  const signIn = (auth, userName, password) => {
    signInWithEmailAndPassword(auth, userName, password)
      .then(async userCredential => {
        const userInfo = await fetchUserInfo(userCredential?.user?.uid);
        setAuthStateContext({
          isLoggedIn: true,
          loginMethod: "firebase",
          user_id: userCredential?.user?.uid,
          profilePicture: userInfo?.profilePicture,
          name: userInfo?.name,
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  const signUp = (auth, email, password, userName, fullName, formValues) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        setDoc(doc(db, "users", userCredential?.user?.uid), {
          fullName: fullName,
          userName: userName,
          email: email,
          roles: ["creator", "consumer"],
          completedJobs: 0,
          stars: 0,
          starredJobs: [],
          createdAt: new Date(),
        });
        setAuthState({
          isLoggedIn: true,
          loginMethod: "firebase",
          user_id: userCredential?.user?.uid,
        });
        setIsFillingStoredInformation(true);
      })
      .catch(error => {
        setError(error.message);
        console.log(error.message);
      });
  };

  async function handleNewWalletAccounts(newAccounts, formValues) {
    if (await verifyWalletUser(newAccounts)) {
      history.push("/");
    }
    await createBasicUser(newAccounts[0], formValues);
    const isValidUser = await verifyWalletUser(newAccounts);
    if (isValidUser) {
      setAuthState({
        isLoggedIn: true,
        loginMethod: "wallet",
        user_id: newAccounts[0],
      });
      const cookies = new Cookies();
      const expirationDate = new Date();
      expirationDate.setDate(expirationDate.getDate() + 30);
      cookies.set("logged", newAccounts[0], { path: "/" });
      setIsFillingStoredInformation(true);
    } else {
      // doc.data() will be undefined in this case
      alert("account not found");
    }
  }

  const onboarding = useRef();

  if (!onboarding.current) {
    onboarding.current = new MetaMaskOnboarding();
  }

  const singUpWithWallet = formValues => {
    delete formValues.password;
    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then(newAccounts => handleNewWalletAccounts(newAccounts, formValues));
    } else {
      onboarding.current.startOnboarding();
    }
  };

  const submitAuthForm = formValues => {
    if (isSignIn) {
      if (formValues?.rememberMe) {
        setPersistence(auth, browserSessionPersistence)
          .then(() => {
            return signIn(auth, formValues?.userEmail, formValues?.password);
          })
          .catch(error => {
            console.log(error);
          });
      } else {
        signIn(auth, formValues?.userEmail, formValues?.password);
      }
    } else {
      if (walletSignUp) {
        singUpWithWallet({ ...formValues });
      } else {
        signUp(
          auth,
          formValues?.userEmail,
          formValues?.password,
          formValues?.userName,
          formValues?.fullName,
          formValues
        );
      }
    }
  };

  return (
    <Form
      className="form"
      layout="vertical"
      onFinish={submitAuthForm}
      validateMessages={{
        types: {
          email: "Write a valid email",
        },
      }}
    >
      {isSignIn ? (
        <>
          <Form.Item
            label={<label>Username or Email</label>}
            name="userEmail"
            rules={[
              {
                required: true,
                message: "Please input your username or email",
              },
            ]}
          >
            <Input bordered={false} />
          </Form.Item>

          <Form.Item
            label={<label>Password</label>}
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password",
              },
            ]}
          >
            <Input.Password bordered={false} />
          </Form.Item>
        </>
      ) : (
        <>
          <Form.Item
            label={<label>Full Name</label>}
            name="fullName"
            rules={[
              {
                required: true,
                message: "Please input your full name",
              },
            ]}
          >
            <Input bordered={false} />
          </Form.Item>

          <Form.Item
            label={<label>Username</label>}
            name="userName"
            rules={[
              {
                required: true,
                message: "Please input your user name",
              },
            ]}
          >
            <Input bordered={false} />
          </Form.Item>

          <Form.Item
            label={<label>Email</label>}
            name="userEmail"
            rules={[
              {
                type: "email",
              },
              {
                required: true,
                message: "Please input your email",
              },
            ]}
          >
            <Input bordered={false} />
          </Form.Item>

          <Form.Item
            label={<label>Password</label>}
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password",
              },
            ]}
          >
            <Input.Password visibilityToggle={false} bordered={false} />
          </Form.Item>
          {error ? <p>{error.replace("Firebase: ", "")}</p> : null}
        </>
      )}

      <div
        className="options"
        style={{ justifyContent: `${isSignIn ? "space-between" : "end"}` }}
      >
        {isSignIn && (
          <div>
            <Form.Item
              name="rememberMe"
              className="rememberMe"
              valuePropName="checked"
            >
              <Checkbox bordered={false}>Remember Me</Checkbox>
            </Form.Item>
          </div>
        )}
        <div className="">
          <Button type="text" htmlType="submit" className="join-enter">
            <span>{isSignIn ? "Enter" : "Join"} Pixul</span>
            <RightOutlined />
          </Button>
        </div>
        {isSignIn ? null : (
          <Button
            type="text"
            htmlType="submit"
            onClick={() => setWalletSignUp(true)}
            className="sign-in-wallet"
          >
            <span>Sign up with your wallet</span>
          </Button>
        )}
      </div>
    </Form>
  );
};
