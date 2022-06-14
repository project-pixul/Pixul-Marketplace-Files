import React, { useEffect, useState } from "react";
import { Banner } from "../components/Cards/BackgroundImages/Banner/Banner";
import { Carousel } from "../components/Carousel/Carousel";
import { HomeHeader } from "../components/Home/Home/HomeHeader";
import { HomeImages } from "../components/Home/Home/HomeImages/HomeImages";
import { PromotedCreators } from "../components/Home/PromotedCreators/PromotedCreators";
import {
  bannerImages as bi,
  creators,
  promotedCreatorInfo as bci,
} from "../API";
import { db } from "../firebase";
import { collection, query, orderBy, getDocs, limit } from "firebase/firestore";
import { fetchPopularServices } from "../utils/fetchPopularServices";

import "./Pages.css";

export const HomePage = () => {
  const [creatorsCardsList, setCreatorsCardsList /*creatorsCardsList */] =
    useState(creators);
  const [promotedCreatorInfo /* setPromotedCreatorInfo */] = useState(bci);
  const [tentrendingCreators, setTenTrendingCreators] = useState(null);
  const [fivetrendingCreators, setFiveTrendingCreators] = useState(null);
  const [moreTrend, setMoreTrend] = useState(false);
  const [morePromote, setMorePromote] = useState(false);
  const [popularServices, setPopularServices] = useState(null);
  const bannerImages = bi;

  const getTrendingCreators = async num => {
    const trendingCreatorsQuery = query(
      collection(db, "users"),
      orderBy("stars", "desc"),
      orderBy("completedJobs", "desc"),
      limit(num)
    );
    const trendingCreatorsDocs = await getDocs(trendingCreatorsQuery);
    const trendingCreatorData = [];
    let count = 0;
    trendingCreatorsDocs.forEach(creator => {
      count++;
      trendingCreatorData.push({
        ...creator.data(),
        id: count,
        user_id: creator.id,
      });
    });

    return trendingCreatorData;
  };

  useEffect(() => {
    getTrendingCreators(5).then(trendingCreators =>
      setFiveTrendingCreators(trendingCreators)
    );
    getTrendingCreators(10).then(trendingCreators =>
      setTenTrendingCreators(trendingCreators)
    );

    fetchPopularServices().then(trendingServices =>
      setPopularServices(trendingServices)
    );
  }, []);

  const handleTrendingCreators = () => {
    setMoreTrend(!moreTrend);
  };

  useEffect(() => {
    function more() {
      setCreatorsCardsList(creators);
    }

    function less() {
      const testing = [...creatorsCardsList];
      testing.length = 5;
      setCreatorsCardsList(testing);
    }

    morePromote ? more() : less();
  }, [morePromote]);

  const handlePromoteCreators = () => {
    setMorePromote(!morePromote);
  };

  console.log(morePromote);
  return (
    <div className="homePage">
      <HomeHeader popularServices={popularServices} />
      <HomeImages items={bannerImages} />
      <div className="popular">
        <div>
          <button onClick={handleTrendingCreators}>View More</button>
          {moreTrend ? (
            fivetrendingCreators?.length ? (
              <Carousel
                title="Trending Creators"
                withArrows={false}
                items={fivetrendingCreators}
                itemType="image"
              />
            ) : null
          ) : tentrendingCreators?.length ? (
            <Carousel
              title="Trending Creators"
              withArrows={false}
              items={tentrendingCreators}
              itemType="image"
            />
          ) : null}
        </div>

        {/* {popularServices?.length ? (
          <div>
            <Carousel
              title="Popular Service"
              withArrows={false}
              items={popularServices}
            />
          </div>
        ) : null} */}

        {/* <Banner src="https://www.cronicavasca.com/uploads/s1/12/53/47/62/cryptocurrencies1600.jpeg" /> */}
        {/* <PromotedCreators promotedCreatorInfo={promotedCreatorInfo} /> */}
        <div>
          <button onClick={handlePromoteCreators}>View More</button>
          <Carousel
            withArrows={false}
            items={creatorsCardsList}
            itemType="image"
          />
        </div>
        {/* <Banner src="https://www.cronicavasca.com/uploads/s1/12/53/47/62/cryptocurrencies1600.jpeg" /> */}
      </div>
    </div>
  );
};
