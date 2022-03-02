import { CategoriesImages } from "../components/Marketplace/CategoriesImages/CategoriesImages";
import { ChatIcon } from "../components/Marketplace/Chat/ChatIcon/ChatIcon";
import { MarketPlaceFilter } from "../components/Marketplace/MarketPlaceFilter/MarketPlaceFilter";
import { Sidebar } from "../components/Marketplace/Sidebar/Sidebar";
import { MultiLineCardContainer } from "../components/MultiLineCardContainer/MultiLineCardContainer";
import React, { useContext, useEffect, useState } from "react";
import { fetchPopularCreators } from "../utils/fetchPopularCreators";
import AuthContext from "../components/AuthForm/AuthContext";
import setMessagesDocRefContext from "./setMessagesDocRefContext";

export const MarketplacePage = () => {
  const [selectedService, /*selectedCategory*/ setSelectedService] =
    useState("Web Design");
  const [creators, setCreators] = useState([]);
  const [messagesDocRef, setMessagesDocRef] = useState(null);
  const { authState } = useContext(AuthContext);

  useEffect(() => {
    async function setPopularCreators() {
      const popularCreators = await fetchPopularCreators(selectedService);
      setCreators(popularCreators);
    }

    setPopularCreators();
  }, [selectedService]);

  return (
    <setMessagesDocRefContext.Provider
      value={{ setMessagesDocRef, messagesDocRef }}
    >
      <div className="grid marketplace-container mx-auto my-5 w-11/12">
        <h1 className="text-center mb-5 lg:mb-0 lg:text-left lg:block text-2xl self-center font-extrabold ">
          THE MARKETPLACE
        </h1>
        <div className="flex items-center justify-between flex-1 sm:flex">
          <MarketPlaceFilter setCreators={setCreators} />
        </div>
        <Sidebar onClick={setSelectedService} />
        <div>
          {creators.length ? <CategoriesImages creators={creators} /> : null}
          <div className="md:pr-10">
            <MultiLineCardContainer
              creators={creators}
              title="Creators"
              setMessagesDocRef={setMessagesDocRef}
            />
          </div>
        </div>
        {authState?.isLoggedIn ? (
          <ChatIcon
            messagesDocRef={messagesDocRef}
            setMessagesDocRef={setMessagesDocRef}
          />
        ) : null}
      </div>
    </setMessagesDocRefContext.Provider>
  );
};
