import React from "react";
import { ImageCard } from "../Cards/ImageCard/ImageCard";

export const MultiLineCardContainer = ({ creators, title }) => {



  return (
    <>
      <h1 className="text-xl font-bold my-3">{title}</h1>
      <div className="grid gap-5 justify-items-center lg:justify-items-start marketplace-creators-container">
        {
          creators.map((creator, index) => (
            <div key={index}>
              <ImageCard creator={creator} />
            </div>
          ))
        }
      </div>
    </>
  );
};
