import { useState, useRef, useContext, useEffect } from "react";
import { Select, Form, Input } from "antd";
import { RightOutlined } from "@ant-design/icons";
import { AuthForm } from "../components/AuthForm/AuthForm";
import MetaMaskOnboarding from "@metamask/onboarding";
import AuthContext from "../components/AuthForm/AuthContext";
import Cookies from "universal-cookie";
import { verifyWalletUser } from "../utils/verifyWalletUser";
import { doc, updateDoc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { fetchUserInfo } from "../utils/fetchUser";
import { useHistory } from "react-router-dom";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

import { services } from "../API";
import ForgetPasword from "../components/AuthForm/ForgetPasword";

import "./Pages.css";

export const AuthPage = () => {
  const [isSigningIn, setisSigningIn] = useState(true);
  const [selectedServices, setSelectedServices] = useState([]);
  const [, /*accounts*/ setAccounts] = useState(null);
  const [, /*singUpFormValues*/ setSignUpFormValues] = useState(null);
  const [isFillingStoredInformation, setIsFillingStoredInformation] =
    useState(false);
  const [authStateWithoutContext, setAuthStateWithoutContext] = useState(null);
  const [visibleForgetPasssword, setVisibleForgetPasssword] = useState(false);

  const { setAuthState, authState } = useContext(AuthContext);
  const history = useHistory();
  useEffect(() => {
    if (authState.isLoggedIn) {
      history.push("/");
    }
  }, [authState, history]);
  //Form components
  const [form] = Form.useForm();
  const { TextArea } = Input;
  const { Option } = Select;

  /**
   * This services list will be used on
   * Services Select on form
   */

  //SELECT METHODS
  const handleOnSelect = item => {
    setSelectedServices([...selectedServices, item]);
  };

  const handleOnDeselect = item => {
    const filteredItems = selectedServices.filter(
      itemOnArray => itemOnArray !== item
    );
    setSelectedServices(filteredItems);
  };

  const handleOnClear = () => {
    setSelectedServices([]);
  };

  //HANDLE VIEWS METHODS
  const toggleSignInView = signIn => {
    setisSigningIn(signIn);
  };

  const handleSubmitForm = async formValues => {
    formValues.services = selectedServices;
    Object.keys(formValues).forEach(key =>
      formValues[key] === undefined ? delete formValues[key] : {}
    );
    await updateDoc(doc(db, "users", authStateWithoutContext?.user_id), {
      ...formValues,
      lowerCaseName: formValues.name.toLowerCase(),
    });
    const userInfo = await fetchUserInfo(authStateWithoutContext?.user_id);
    for (const service of formValues?.services) {
      const docRef = doc(db, "services", service);
      const serviceDoc = await getDoc(docRef);
      if (!serviceDoc.exists()) {
        await setDoc(docRef, { numberOfUsers: 0 });
      }

      await updateDoc(docRef, {
        numberOfUsers: firebase.firestore.FieldValue.increment(1),
      });
    }
    const authStateCopy = {
      ...authStateWithoutContext,
      profilePicture: userInfo.profilePicture,
    };
    setIsFillingStoredInformation(false);
    setAuthState(authStateCopy);
  };

  async function handleNewAccounts(newAccounts) {
    setAccounts(newAccounts);
    const isValidUser = await verifyWalletUser(newAccounts);
    const userInfo = await fetchUserInfo(newAccounts[0]);
    if (isValidUser) {
      setAuthState({
        isLoggedIn: true,
        loginMethod: "wallet",
        user_id: newAccounts[0],
        profilePicture: userInfo?.profilePicture,
        name: userInfo?.name,
      });
      const cookies = new Cookies();
      const expirationDate = new Date();
      expirationDate.setDate(expirationDate.getDate() + 30);
      cookies.set("logged", newAccounts[0], { path: "/" });
    } else {
      // doc.data() will be undefined in this case
      alert("account not found");
    }
  }

  const onboarding = useRef();

  if (!onboarding.current) {
    onboarding.current = new MetaMaskOnboarding();
  }

  const walletAuth = () => {
    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then(handleNewAccounts);
      window.ethereum.on("connect", handleNewAccounts);
    } else {
      onboarding.current.startOnboarding();
    }
  };

  return (
    <div className="auth">
      {/* FORM SECTION */}
      <div className="form">
        {isFillingStoredInformation ? (
          <>
            <p>
              Thanks for creating your Creator account, now it's time to add
              information to your store.
            </p>

            <h1>Store Information</h1>

            {/* STORE INFORMATION FORM */}
            <Form form={form} layout="vertical" onFinish={handleSubmitForm}>
              {/* NAME */}
              <Form.Item
                label={<label style={{ paddingBottom: 0 }}>Store Name</label>}
                name="name"
                rules={[
                  { required: true, message: "Please input your Store Name!" },
                ]}
              >
                <Input bordered={false} className="p-1 text-xl" />
              </Form.Item>
              {/* PROFILE PICTURE */}
              <Form.Item
                label={
                  <label style={{ paddingBottom: 0 }}>Profile Picture</label>
                }
                name="profilePicture"
                rules={[
                  {
                    required: true,
                    type: "url",
                    warningOnly: true,
                    message: "Please input a valid URL",
                  },
                ]}
              >
                <Input bordered={false} className="p-1 text-xl" />
              </Form.Item>

              {/* SERVICES */}
              <Form.Item>
                <label htmlFor="services">Services</label>
                <Select
                  id="services"
                  mode="multiple"
                  allowClear
                  bordered={false}
                  placeholder="Select your services"
                  onDeselect={handleOnDeselect}
                  onClear={handleOnClear}
                  onSelect={handleOnSelect}
                >
                  {services.map(service => (
                    <Option className="text-xl" key={service}>
                      {service}
                    </Option>
                  ))}
                </Select>
              </Form.Item>

              {/* PORTTFOLIO */}
              <Form.Item
                label={
                  <label style={{ paddingBottom: 0 }}>Porttfolio Link</label>
                }
                name="porttfolio"
                rules={[
                  {
                    type: "url",
                    warningOnly: true,
                    message: "Please input a valid URL",
                  },
                ]}
              >
                <Input bordered={false} className="p-1 text-xl" />
              </Form.Item>

              {/* LOCATION */}
              <Form.Item
                label={
                  <label style={{ paddingBottom: 0 }}>Your location</label>
                }
                name="location"
              >
                <Input bordered={false} className="p-1 text-xl" />
              </Form.Item>

              {/* ABOUT ME */}
              <label style={{ paddingBottom: 0 }}>About me</label>
              <Form.Item className="mb-4" name="about">
                <div className="outline-none border-4 text-black mb-0 h-21">
                  <TextArea
                    className="p-1 text-xl"
                    autoSize={false}
                    bordered={false}
                    rows={3}
                  />
                </div>
              </Form.Item>

              {/* SUBMIT BUTTON */}
              <Form.Item>
                <button
                  type="submit"
                  className="flex items-center justify-end right-0 gap-1 bg-gray-400 w-36 p-3 rounded-2xl"
                >
                  <span className="text-gray-900 text-xs font-bold">
                    CONTINUE
                  </span>
                  <RightOutlined className="text-gray-900" />
                </button>
              </Form.Item>
            </Form>
          </>
        ) : (
          <>
            <div className="heading">
              <h1
                style={{
                  color: !isSigningIn ? "rgba(255, 255, 255, 0.5)" : "white",
                }}
                onClick={() => toggleSignInView(true)}
              >
                Sign In
              </h1>
              <h1
                style={{
                  color: isSigningIn ? "rgba(255, 255, 255, 0.5)" : "white",
                }}
                onClick={() => toggleSignInView(false)}
              >
                Sign Up
              </h1>
              <div className="block"></div>
            </div>
            <AuthForm
              isSignIn={isSigningIn}
              setFormValues={setSignUpFormValues}
              setIsFillingStoredInformation={setIsFillingStoredInformation}
              setAuthState={setAuthStateWithoutContext}
              setAuthStateContext={setAuthState}
            />
            {isSigningIn && (
              <div className="sign-in">
                <label
                  onClick={() => {
                    setVisibleForgetPasssword(true);
                  }}
                >
                  Forget your password? <span>Click Here</span>
                </label>
                <p>or</p>
                <button onClick={walletAuth} className="sign-in-wallet">
                  <span>Sign In With Your Wallet</span>
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* IMAGE SECTION */}
      {/* <div
        className="relative bg-cover bg-center h-full flex-1 hidden md:block"
        style={{
          backgroundImage: `linear-gradient( rgba(0,0,0,.5), rgba(0,0,0,.5)), url("https://www.teahub.io/photos/full/2-22965_wallpaper-of-bitcoin-coin-money-technology-background-imagenes.jpg")`,
        }}
      >
        <div className="px-10 absolute flex justify-between w-full items-center bottom-12 font-medium">
          <div>
            <div className="text-3xl flex flex-col text-white">
              <label>Join the</label>
              <label>Evolution of DeFi</label>
            </div>
            <label className="text-gray-300">
              Want to become a Creator?{" "}
              <span className="border-b-2 border-gray-500">Click Here</span>
            </label>
          </div>
          <div>
            <label className="text-gray-300">Designer Name</label>
          </div>
        </div>
      </div> */}
      <ForgetPasword
        visible={visibleForgetPasssword}
        handleVisible={setVisibleForgetPasssword}
      />
    </div>
  );
};
