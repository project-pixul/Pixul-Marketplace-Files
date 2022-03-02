import { useRef, useState } from "react";
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
import { useHistory } from "react-router-dom";
import MetaMaskOnboarding from "@metamask/onboarding";
import {
  createBasicUser,
  verifyWalletUser,
} from "../../utils/verifyWalletUser";
import Cookies from "universal-cookie";
import { fetchUserInfo } from "../../utils/fetchUser";

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
      className="flex flex-col text-gray-400"
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
            label={
              <label className="font-medium text-xs mb-1 text-gray-400">
                USERNAME OR EMAIL
              </label>
            }
            className=" outline-none border-b-4 text-black text-xl mb-5"
            name="userEmail"
            rules={[
              {
                required: true,
                message: "Please input your username or email",
              },
            ]}
          >
            <Input bordered={false} className="p-0 text-xl" />
          </Form.Item>

          <Form.Item
            label={
              <label className="font-medium text-xs mb-1 text-gray-400">
                PASSWORD
              </label>
            }
            className="outline-none border-b-4 text-black text-xl mb-5"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password",
              },
            ]}
          >
            <Input.Password bordered={false} className="p-0 text-xl" />
          </Form.Item>
        </>
      ) : (
        <>
          <Form.Item
            label={
              <label className="font-medium text-xs mb-1 text-gray-400">
                FULL NAME
              </label>
            }
            className=" outline-none border-b-4 text-black text-xl mb-5"
            name="fullName"
            rules={[
              {
                required: true,
                message: "Please input your full name",
              },
            ]}
          >
            <Input bordered={false} className="p-0 text-xl" />
          </Form.Item>

          <Form.Item
            label={
              <label className="font-medium text-xs mb-1 text-gray-400">
                USERNAME
              </label>
            }
            className=" outline-none border-b-4 text-black text-xl mb-5"
            name="userName"
            rules={[
              {
                required: true,
                message: "Please input your user name",
              },
            ]}
          >
            <Input bordered={false} className="p-0 text-xl" />
          </Form.Item>

          <Form.Item
            label={
              <label className="font-medium text-xs mb-1 text-gray-400">
                EMAIL
              </label>
            }
            className=" outline-none border-b-4 text-black text-xl mb-5"
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
            <Input bordered={false} className="p-0 text-xl" />
          </Form.Item>

          <Form.Item
            label={
              <label className="font-medium text-xs mb-1 text-gray-400">
                PASSWORD
              </label>
            }
            className="outline-none border-b-4 text-black text-xl mb-5"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password",
              },
            ]}
          >
            <Input.Password
              visibilityToggle={false}
              bordered={false}
              className="p-0 text-xl"
            />
          </Form.Item>
          {error ? <p>{error.replace("Firebase: ", "")}</p> : null}
        </>
      )}

      <div className={`flex justify-${isSignIn ? "between" : "end"}`}>
        {isSignIn && (
          <div className="flex items-center gap-2">
            <Form.Item
              className="m-0"
              name="rememberMe"
              valuePropName="checked"
            >
              <Checkbox bordered={false} className="m-0">
                REMEMBER ME
              </Checkbox>
            </Form.Item>
          </div>
        )}
        <div className="bg-gray-400 rounded-2xl">
          <Button
            type="text"
            htmlType="submit"
            className="flex items-center justify-end gap-1 w-36 rounded-2xl"
          >
            <span className="text-gray-900 text-xs font-bold">
              {isSignIn ? "ENTER" : "JOIN"} TCC
            </span>
            <RightOutlined className="text-gray-900 text-center text-xs" />
          </Button>
        </div>
        {isSignIn ? null : (
          <Button
            type="text"
            htmlType="submit"
            className="flex items-center m-auto bg-gray-200 border-2 border-gray-500 rounded-full px-2 py-1 ml-2"
            onClick={() => setWalletSignUp(true)}
          >
            <p className="text-xs font-bold">SIGN UP WITH YOUR WALLET</p>
            <CaretRightOutlined />
          </Button>
        )}
      </div>
    </Form>
  );
};
