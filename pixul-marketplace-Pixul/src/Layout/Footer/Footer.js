import {
  GithubOutlined,
  WeiboCircleFilled,
  TaobaoCircleFilled,
  SkypeFilled,
  CodeSandboxCircleFilled,
  AliwangwangFilled,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import logo from "../../assets/img/logo.png";

export const Footer = () => {
  return (
    <footer className="w-full bg-gray-100">
      <div className="flex flex-col gap-10 items-center justify-between py-3 px-5 md:px-10">
        <div className="grid gap-10 w-8/12 sm:w-10/12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:w-full max-w-screen-lg ">
          <div className="flex flex-col gap-3">
            <h1 className="text-2xl font-bold">Categories</h1>
            <Link to="/">Graphic & design</Link>
            <Link to="/">Digital Marketing</Link>
            <Link to="/">Writing & Translation</Link>
            <Link to="/">Video Editing</Link>
            <Link to="/">Animation</Link>
            <Link to="/">Music & Audio</Link>
            <Link to="/">Cryptocurrency</Link>
            <Link to="/">Smart Contracts</Link>
            <Link to="/">Contract Launch</Link>
          </div>
          <div className="flex flex-col gap-3">
            <h1 className="text-2xl font-bold">About</h1>
            <Link to="/">About us</Link>
            <Link to="/">Press Release</Link>
            <Link to="/">New</Link>
            <Link to="/">Partnerships</Link>
            <Link to="/">Privacy Policy</Link>
            <Link to="/">Terms of Service</Link>
            <Link to="/">Sponsorships</Link>
          </div>
          <div className="flex flex-col gap-3">
            <h1 className="text-2xl font-bold">Support Center</h1>
            <Link to="/">Help & Support</Link>
            <Link to="/">Selling on TCC</Link>
            <Link to="/">Buying on TCC</Link>
          </div>
          <div className="flex flex-col gap-3">
            <h1 className="text-2xl font-bold">Community</h1>
            <Link to="/">Forum</Link>
            <Link to="/">Blog</Link>
            <Link to="/">Affiliates</Link>
            <Link to="/">Become a Creator</Link>
            <Link to="/">Discord</Link>
            <Link to="/">Telegram</Link>
          </div>
        </div>
        <div className="w-9/12 h-0.5 bg-gray-300 rounded" />
        <div className="flex flex-col items-center justify-between w-9/12 gap-3 lg:flex-row">
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:gap-10">
            <div className="flex items-center gap-2">
              <img src={logo} alt="logo" className="w-7 h-7" />
              <label className="text-lg tracking-wide">THE COLLECTIVE</label>
            </div>
            <label className="text-xs">
              &#169; Pixul LCC. {new Date().getFullYear()}
            </label>
          </div>
          <div className="flex gap-5 text-2xl">
            <GithubOutlined className="social-media-logo" />
            <WeiboCircleFilled className="social-media-logo" />
            <TaobaoCircleFilled className="social-media-logo" />
            <SkypeFilled className="social-media-logo" />
            <CodeSandboxCircleFilled className="social-media-logo" />
            <AliwangwangFilled className="social-media-logo" />
          </div>
        </div>
      </div>
    </footer>
  );
};
