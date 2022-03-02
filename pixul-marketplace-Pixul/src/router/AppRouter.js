import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route,
} from "react-router-dom";
import { Layout } from "../Layout/Layout";
import { AuthPage } from "../pages/AuthPage";
import { HomePage } from "../pages/HomePage";
import { MarketplacePage } from "../pages/MarketplacePage";
import { ProfilePage } from "../pages/ProfilePage";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useState } from "react";
import AuthContext from "../components/AuthForm/AuthContext";
import Cookies from "universal-cookie";
import MetaMaskOnboarding from "@metamask/onboarding";
import { verifyWalletUser } from "../utils/verifyWalletUser";
import { fetchUserInfo } from "../utils/fetchUser";

export const AppRouter = () => {
  const [authState, setAuthState] = useState({
    isLoggedIn: false,
    loginMethod: null,
  });

  const [loggedUser, setLoggedUser] = useState({});

  const [isFillingStoredInformation, setIsFillingStoredInformation] =
    useState(false);

  const logWallet = async walletInfo => {
    const isValidUser = await verifyWalletUser(walletInfo);
    const userInfo = await fetchUserInfo(walletInfo[0])
    if (isValidUser && loggedWallet === walletInfo[0] && !authState.isLoggedIn) {
      setAuthState({
        isLoggedIn: true,
        loginMethod: "wallet",
        user_id: walletInfo[0],
        profilePicture: userInfo?.profilePicture,
        name: userInfo?.name
      });
    }
  };

  const cookies = new Cookies();
  const loggedWallet = cookies.get("logged");
  if (loggedWallet) {
    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then(async walletInfo => {
          await logWallet(walletInfo);
        });
    }
  }

  onAuthStateChanged(auth, user => {
    if (user && authState.isLoggedIn === false && window.location.href.split('/').pop() !== 'auth') {
      const setUserAuthState = async () => {
        const userInfo = await fetchUserInfo(user.uid)
        setAuthState({
          isLoggedIn: true,
          loginMethod: "firebase",
          user_id: user.uid,
          profilePicture: userInfo?.profilePicture,
          name: userInfo?.name
        });
      }
      setUserAuthState()
    }
  });

  const protectedPage = componentToRender =>
    authState?.isLoggedIn && !isFillingStoredInformation ? (
      <Redirect to="/home" />
    ) : (
      componentToRender
    );

  const protectedPageIfNotSigned = componentToRender =>
    !authState?.isLoggedIn ? (
      <Redirect to="/auth" />
    ) : (
      componentToRender
    );


  return (
    <Router>
      <AuthContext.Provider
        value={{
          authState,
          setAuthState,
          isFillingStoredInformation,
          setIsFillingStoredInformation,
          loggedUser,
          setLoggedUser,
        }}
      >
        <Layout>
          <Switch>
            <Route
              exact
              path="/auth"
              component={() => protectedPage(<AuthPage />)}
            />
            <Route exact path="/home" component={HomePage} />
            <Route exact path="/marketplace" component={MarketplacePage} />
            <Route
              path="/profile/:user_id"
              render={() =>
                protectedPageIfNotSigned(<ProfilePage />)
              }
            />
            <Redirect to="/home" />
          </Switch>
        </Layout>
      </AuthContext.Provider>
    </Router>
  );
};
