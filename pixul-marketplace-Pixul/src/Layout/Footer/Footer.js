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
          <a href="https://twitter.com/Pixul_">
            <TwitterOutlined />
          </a>
          <a href="https://github.com/project-pixul/Pixul-Ecosystem">
            <GithubOutlined />
          </a>
        </div>
      </div>
      <div>
        <div>
          <h2>Ecosystem</h2>
          <div className="categories">
            <a href="/home">Marketplace</a>
            <a href="https://pixul.app/xpixul#staking">Staking</a>
            <a href="https://pixul.app/farm">Farms</a>
            <a href="https://www.pixul.io/">DEX</a>
          </div>
        </div>
        <div>
          <h2>Documents</h2>
          <div className="categories">
            <a href="https://www.pixul.io/_files/ugd/31aeaa_211f1a6c68774e909ec9d35d07db2d6f.pdf">
              Whitepaper
            </a>
            <a href="https://www.pixul.io/roadmap">Roadmap</a>
            <a href="https://www.pixul.io/transparency">Transparency</a>
            <a href="https://github.com/solidproof/projects/blob/main/Pixul/SmartContract_Audit_Solidproof_PixulToken.pdf">
              Audits
            </a>
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
