import { ImageCard } from "../Cards/ImageCard/ImageCard";
import { CategoryCard } from "../Cards/CategoryCard/CategoryCard";
import "./carousel.scss";

export const Carousel = ({
  items,
  itemType,
  textOrientation,
  title,
  showEscrowOnClick = false,
  withArrows,
}) => {
  console.log(items);
  return (
    <div className="carousel">
      {title && (
        <h1 className={`${textOrientation ? textOrientation : ""}`}>{title}</h1>
      )}
      <div>
        {items.map(item =>
          itemType === "image" ? (
            <ImageCard
              key={item.key ? item.key : item.user_id}
              showEscrowOnClick={showEscrowOnClick}
              creator={item}
            />
          ) : (
            <CategoryCard key={item.id} categoryInfo={item} />
          )
        )}
      </div>
    </div>
  );
};
