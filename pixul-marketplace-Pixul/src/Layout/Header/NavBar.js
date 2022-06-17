import React from "react";
import { Link } from "react-router-dom";

import "./header.css";
const NavBar = ({ onClick = () => {} }) => {
  return (
    <div className="nav big">
      <Link onClick={onClick} to="/home">
        Home
      </Link>
      <Link onClick={onClick} to="/marketplace">
        Categories
      </Link>
      <Link onClick={onClick} to="/marketplace">
        Post Job
      </Link>
      <Link onClick={onClick} to="/marketplace">
        Contact Us
      </Link>
      <Link to="/marketplace">Orders</Link>
    </div>
  );
};

export default NavBar;
