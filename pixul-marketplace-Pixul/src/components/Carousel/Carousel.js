import { useRef } from "react";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { ImageCard } from "../Cards/ImageCard/ImageCard";
import { CategoryCard } from "../Cards/CategoryCard/CategoryCard";

export const Carousel = ({
  items,
  itemType,
  textOrientation,
  title,
  showEscrowOnClick = false,
  withArrows,
}) => {
  const navRef = useRef();
  const handleScroll = direction => {
    if (direction === "left") {
      if (navRef) navRef.current.scrollLeft -= 946;
    } else {
      if (navRef) navRef.current.scrollLeft += 946;
    }
  };

  return (
    <div className="w-full">
      {title && (
        <h1
          className={`font-bold text-xl ${
            textOrientation ? textOrientation : ""
          }`}
        >
          {title}
        </h1>
      )}
      <div className={withArrows ? "overflow-hidden" : "overflow-auto"}>
        <div
          className={`flex m-auto mt-5 gap-5 relative md:justify-between ${
            withArrows ? "smooth-scroll px-7" : ""
          }`}
          ref={navRef}
        >
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

          {withArrows && (
            <div className="-mx-7 flex justify-between absolute bottom-2/4 w-full text-mxl">
              <LeftOutlined
                onClick={() => handleScroll("left")}
                className="p-1 border border-black rounded-full"
              />
              <RightOutlined
                onClick={() => handleScroll("right")}
                className="p-1 border border-black rounded-full"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
