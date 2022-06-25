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
      <div className="marketplace">
        <div className="marketplace-header">
          <div>
            <div className="block"></div>
            <h1>Marketplace</h1>
          </div>
          <div>
            <MarketPlaceFilter setCreators={setCreators} />
          </div>
        </div>

        <div className="marketplace-content">
          <Sidebar onClick={setSelectedService} />
          <div>
            {creators.length ? <CategoriesImages creators={creators} /> : null}
            <div>
              <MultiLineCardContainer
                creators={creators}
                title="Creators"
                setMessagesDocRef={setMessagesDocRef}
              />
            </div>
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
