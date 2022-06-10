import { HomeHeaderContent } from "./HomeHeader/HomeHeaderContent.js";
import { HomeHeaderImage } from "./HomeHeader/HomeHeaderImage";

import "./Home.css";

export const HomeHeader = ({ popularServices }) => {
  return (
    <div className="homeContent">
      <HomeHeaderContent popularServices={popularServices} />
      <HomeHeaderImage />
    </div>
  );
};
