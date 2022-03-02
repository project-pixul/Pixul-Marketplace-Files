import { useContext } from "react";
import { Avatar, Menu, Dropdown } from "antd";
import { UserOutlined } from "@ant-design/icons";
import AuthContext from "../../AuthForm/AuthContext";
import { useHistory } from "react-router-dom";
import { auth } from "../../../firebase";
import { signOut } from "firebase/auth"
import Cookies from "universal-cookie";

export const MarketPlaceUser = () => {
  const { authState, setAuthState } = useContext(AuthContext);

  const history = useHistory();

  const handleRedirectProfile = () => {
    history.push("/profile/" + authState.user_id);
  };

  const handleLouOut = () => {
    const cookies =  new Cookies()
    cookies.remove("logged")
    signOut(auth).then(() => {
      setAuthState({
        isLoggedIn: false,
        loginMethod: null,
        user_id: null
      })


    }).catch((error) => {
      setAuthState({
        isLoggedIn: false,
        loginMethod: null,
        user_id: null
      })

    });

  };

  const menu = (
    <Menu>
      <Menu.Item key="1" onClick={handleRedirectProfile}>
        My Profile
      </Menu.Item>
      <Menu.Item key="2" onClick={handleLouOut}>
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="flex justify-between items-center gap-2">
      <Dropdown overlay={menu} placement="bottomCenter" arrow>
        <div className="flex flex-row justify-center items-center gap-2">

          <p className="hidden md:flex m-0 text-xs">{authState?.name}</p>
          <Avatar
            className="cursor-pointer bg-gray-600 flex justify-center items-center "
            src={
              authState?.profilePicture ? (
                authState?.profilePicture
              ) : (
                <UserOutlined className="text-xl" />
              )
            }
            size={45}
          />
        </div>
      </Dropdown>
    </div>
  );
};
