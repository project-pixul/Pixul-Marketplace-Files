import { Avatar } from "antd";

export const ProfileHeader = ({ profilePicture }) => {
  const coverImage =
    "https://c.wallhere.com/photos/3f/49/3000x1687_px_artwork_astronaut_digital_art_fantasy_Art_space_stars_sun-740992.jpg!d";
  return (
    <div
      className="relative w-full bg-cover bg-center h-72"
      style={{
        backgroundImage: `url("${coverImage}")`,
      }}
    >
      <img
        src="https://assets.codepen.io/t-517/divider-triangle.png"
        className="absolute bottom-0 left-0 w-full h-24"
        alt=""
      />
      <Avatar
        className="absolute creator-avatar"
        src={profilePicture}
        size={150}
      />
    </div>
  );
};
