import { useState, useContext } from "react";
import { MenuOutlined } from "@ant-design/icons";
import { Drawer } from "antd";
import { useEffect } from "react";
import NavBar from "./NavBar";
import { MarketPlaceUser } from "../../components/Marketplace/MarketPlaceUser/MarketPlaceUser";
import {
  connectWallet,
  getCurrentWalletConnected,
} from "../../utils/walletInteract";
import AuthContext from "../../components/AuthForm/AuthContext";
import { useHistory } from "react-router-dom";

import logo from "../../assets/img/logo.png";

export const Header = () => {
  const [togleMenu, setTogleMenu] = useState(false);
  const [walletAddress, setWallet] = useState("");
  const [, /*status*/ setStatus] = useState("");

  const { authState } = useContext(AuthContext);

  const history = useHistory();

  function addWalletListener() {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", accounts => {
        if (accounts.length > 0) {
          setWallet(accounts[0]);
          setStatus("👆🏽 Write a message in the text-field above.");
        } else {
          setWallet("");
          setStatus("🦊 Connect to Metamask using the top right button.");
        }
      });
    } else {
      setStatus(
        <p>
          {" "}
          🦊{" "}
          <a
            target="_blank"
            rel="noreferrer"
            href={`https://metamask.io/download.html`}
          >
            You must install Metamask, a virtual Ethereum wallet, in your
            browser.
          </a>
        </p>
      );
    }
  }

  const connectWalletPressed = async () => {
    const walletResponse = await connectWallet();
    setStatus(walletResponse.status);
    setWallet(walletResponse.address);
  };

  useEffect(() => {
    async function myFunction() {
      const { address, status } = await getCurrentWalletConnected();
      setWallet(address);
      setStatus(status);
      addWalletListener();
    }
    myFunction();
  }, []);

  const openMenu = () => {
    setTogleMenu(true);
  };

  const closeMenu = () => {
    setTogleMenu(false);
  };

  return (
    <header className="w-full bg-gray-100">
      <div className="flex items-center justify-between py-3 px-5 md:px-10">
        {/* LOGO SECTION */}
        {/* <div
          onClick={() => {
            history.push("/home");
          }}
          className="flex items-center gap-2 cursor-pointer"
        >
          <img src={logo} alt="logo" className="w-10 h-10" />
          <span className="hidden lg:flex text-lg tracking-wide">
            THE COLLECTIVE
          </span>
        </div> */}

        {/* PRINCIPAL CONTAINER */}
        <div className="flex items-center gap-5">
          {/* MENU */}
          {/* <div className="hidden md:flex">
            <NavBar />
          </div> */}

          {/* WALLET */}
          {/* <button id="walletButton" onClick={connectWalletPressed}>
            {walletAddress.length > 0 ? (
              "Connected: " +
              String(walletAddress).substring(0, 6) +
              "..." +
              String(walletAddress).substring(38)
            ) : (
              <span>Connect Wallet</span>
            )}
          </button> */}

          {/* USER PROFILE */}
          {authState?.isLoggedIn ? <MarketPlaceUser /> : null}

          {/* MOBILE MENU TRIGGER */}
          {/* <MenuOutlined
            onClick={openMenu}
            className="md:hidden text-2xl mb-1"
          /> */}
        </div>
      </div>

      {/* MOBILE MENU */}
      <Drawer
        title="The collective coin"
        placement={"top"}
        closable={true}
        onClose={closeMenu}
        visible={togleMenu}
        key={"var-nav"}
        className="md:hidden"
        height="90%"
      >
        <NavBar onClick={closeMenu} />
      </Drawer>
    </header>
  );
};
