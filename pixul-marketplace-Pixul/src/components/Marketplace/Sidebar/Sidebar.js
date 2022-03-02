import { Drawer } from "../../Drawer/Drawer";
import { Nav } from "../../Nav/Nav";
import { services } from "../../../API";

export const Sidebar = ({ onClick }) => {

  return (
    <div>
      <Drawer items={services} onClick={onClick} />
      <div className="hidden lg:block">
        <h1 className="text-xl font-bold mb-3">Categories</h1>
        <Nav items={services} onClick={onClick} />
      </div>
    </div>
  );
};
