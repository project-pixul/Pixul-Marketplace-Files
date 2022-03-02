import React, { useEffect, useState } from "react";
import { Banner } from "../components/Cards/BackgroundImages/Banner/Banner";
import { Carousel } from "../components/Carousel/Carousel";
import { HomeHeader } from "../components/Home/Home/HomeHeader";
import { HomeImages } from "../components/Home/Home/HomeImages/HomeImages";
import { PromotedCreators } from "../components/Home/PromotedCreators/PromotedCreators";
import {
  bannerImages as bi,
  creators,
  promotedCreatorInfo as bci
} from "../API";
import { db } from "../firebase";
import { collection, query, orderBy, getDocs, limit } from "firebase/firestore";
import { fetchPopularServices } from "../utils/fetchPopularServices";

export const HomePage = () => {
  const [creatorsCardsList /*creatorsCardsList */] = useState(creators);
  const [promotedCreatorInfo /* setPromotedCreatorInfo */] = useState(bci);
  const [trendingCreators, setTrendingCreators] = useState(null);
  const [popularServices, setPopularServices] = useState(null);
  const bannerImages = bi;

  const getTrendingCreators = async () => {
    const trendingCreatorsQuery = query(collection(db, "users"), orderBy("stars", "desc"), orderBy("completedJobs", "desc"), limit(10));
    const trendingCreatorsDocs = await getDocs(trendingCreatorsQuery);
    const trendingCreatorData = [];
    let count = 0;
    trendingCreatorsDocs.forEach(creator => {
      count++;
      trendingCreatorData.push({ ...creator.data(), id: count, user_id: creator.id });
    });

    return (trendingCreatorData);
  };


  useEffect(() => {
    getTrendingCreators().then((trendingCreators) => setTrendingCreators(trendingCreators));
    fetchPopularServices().then(trendingServices => setPopularServices(trendingServices));
  }, []);

  return (
    <div className="my-14">
      <HomeHeader popularServices={popularServices}/>
      <HomeImages items={bannerImages} />
      <div className="flex flex-col gap-10">
        {trendingCreators?.length ? <div className="w-11/12 m-auto lg:w-10/12 xl:w-8/12">
          <Carousel
            title="Trending Creators"
            withArrows={false}
            items={trendingCreators}
            itemType="image"
          />
        </div> : null}
        {popularServices?.length ? <div className="w-11/12 m-auto lg:w-10/12 xl:w-8/12">
          <Carousel
            title="Popular Service"
            withArrows={false}
            items={popularServices}
          />
        </div> : null}

        <Banner src="https://www.cronicavasca.com/uploads/s1/12/53/47/62/cryptocurrencies1600.jpeg" />
        <PromotedCreators promotedCreatorInfo={promotedCreatorInfo} />
        <div className="w-11/12 m-auto lg:w-10/12 xl:w-8/12">
          <Carousel
            withArrows={false}
            items={creatorsCardsList}
            itemType="image"
          />
        </div>
        <Banner src="https://www.cronicavasca.com/uploads/s1/12/53/47/62/cryptocurrencies1600.jpeg" />
      </div>
    </div>
  );
};
