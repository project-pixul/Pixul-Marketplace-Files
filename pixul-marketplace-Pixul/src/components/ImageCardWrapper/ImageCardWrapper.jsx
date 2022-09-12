import { ImageCard } from "../Cards/ImageCard/ImageCard";
import "./ImageCardWrapper.scss";

export const ImageCardWrapper = ({
  items,
  itemType,
  textOrientation,
  title,
  showEscrowOnClick = false,
  withArrows,
}) => {
  console.log(items);
  return (
    <div className="image-card-wrapper">
      {items.map(item => {
        return (
          itemType === "image" && (
            <ImageCard
              key={item.key ? item.key : item.user_id}
              showEscrowOnClick={showEscrowOnClick}
              creator={item}
            />
          )
        );
      })}
    </div>
  );
};
