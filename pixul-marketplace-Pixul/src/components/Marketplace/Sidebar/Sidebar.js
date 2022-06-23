import { Drawer } from "../../Drawer/Drawer";
import { Nav } from "../../Nav/Nav";
import { services } from "../../../API";

import "../marketplace.css";

export const Sidebar = ({ onClick }) => {
  return (
    <div>
      <Drawer items={services} onClick={onClick} />
      <div>
        <h1>Categories</h1>
        <Nav items={services} onClick={onClick} />
      </div>
    </div>
  );
};
