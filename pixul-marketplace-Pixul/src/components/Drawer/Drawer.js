import { Drawer as AntDrawer } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import { useState } from "react";
import { Nav } from "../Nav/Nav";

export const Drawer = ({ items, onClick }) => {
  const [isVisible, setIsVisible] = useState(false);

  const closeDrawer = () => {
    setIsVisible(false);
  };

  const openDrawer = () => {
    setIsVisible(true);
  };

  return (
    <>
      <div className="fixed bg-gray-300 py-2 px-5 rounded-tr-xl left-0 rounded-br-xl z-10 lg:hidden">
        <MenuOutlined className="text-2xl" onClick={openDrawer} />
      </div>
      <AntDrawer
        placement="left"
        closable={false}
        onClose={closeDrawer}
        visible={isVisible}
      >
        <h1 className="text-xl font-bold mb-3">Categories</h1>
        <Nav items={items} onClick={onClick} />
      </AntDrawer>
    </>
  );
};
