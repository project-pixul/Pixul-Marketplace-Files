import React from "react";
import { Link } from "react-router-dom";

const NavBar = ({ onClick = () => {} }) => {
  return (
    <div className="flex flex-col gap-10 items-center text-xl font-bold md:flex-row md:text-sm md:gap-5">
      <Link onClick={onClick} to="/home">
        HOME
      </Link>
      <Link onClick={onClick} to="/marketplace">
        MARKET PLACE
      </Link>
      <Link onClick={onClick} to="/marketplace">
        POST JOB
      </Link>
      <Link onClick={onClick} to="/marketplace">
        CONTACT US
      </Link>
    </div>
  );
};

export default NavBar;
