import {
  GithubOutlined,
  MediumOutlined,
  TwitterOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import logo from "../../assets/img/logo.png";

import "./footer.css";

export const Footer = () => {
  return (
    <footer className="footer">
      <div>
        <img src={logo} alt="Pixul Logo" />
        <p>
          Pixul | Developing cryto solutions for everyday business and personal
          transactions.
        </p>
        <div>
          <MediumOutlined />
          <TwitterOutlined />
          <GithubOutlined />
        </div>
      </div>
      <div>
        <div>
          <h2>Ecosystem</h2>
          <div className="categories">
            <Link to="/">Marketplace</Link>
            <Link to="/">Staking</Link>
            <Link to="/">Farms</Link>
            <Link to="/">DEX</Link>
          </div>
        </div>
        <div>
          <h2>Documents</h2>
          <div className="categories">
            <Link to="/">Whitepaper</Link>
            <Link to="/">Roadmap</Link>
            <Link to="/">Transparency</Link>
            <Link to="/">Audits</Link>
          </div>
        </div>
        <div>
          <h2>Protocol</h2>
          <div className="categories">
            <Link to="/">Vote</Link>
            <Link to="/">xPIXUL</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
