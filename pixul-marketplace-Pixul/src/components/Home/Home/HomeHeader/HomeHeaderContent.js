import { useState } from "react";
import { acceptedCryptos as ac } from "../../../../API";
import { AcceptedCryptos } from "../../AcceptedCryptos/AcceptedCryptos";

export const HomeHeaderContent = ({ popularServices }) => {
  const [acceptedCryptos /* , setAcceptedCryptos */] = useState(ac);

  return (
    <div className="text-black">
      <h1 className="text-black text-5xl font-bold mb-5 sm:text-6xl md:text-8xl">
        Marketplace
      </h1>
      <h3 className="text-3xl font-medium italic sm:text-5xl">
        Hire Professionals.
      </h3>
      <h3 className="text-3xl font-medium italic mb-5 sm:text-5xl">
        Pay with Crypto.
      </h3>
      <p className="mb-5">
        Welcome to the collective's Decentralized Freelance Marketplace 1.0.
      </p>
      <p className="mb-5">
        Discover and connect with creators, freelancers and innovators
        worldwide. These professionals are ready to help your business and more
        to strive to the next level.
      </p>

      <div className="flex flex-wrap items-center gap-2 mb-5">
        <label className="font-bold w-min ">Trending:</label>
        {popularServices?.length
          ? popularServices.map(service => (
              <label className="w-max text-xs " key={service.category}>
                {service.category}
              </label>
            ))
          : null}
      </div>
      <div className="flex gap-10 mb-5">
        <button className="py-2.5 px-3 w-32 border-2 rounded">BUY STCC</button>
        <button className="py-2.5 px-3 w-32 border-2 rounded">
          LEARN MORE
        </button>
      </div>
      <AcceptedCryptos acceptedCryptos={acceptedCryptos} />
    </div>
  );
};
