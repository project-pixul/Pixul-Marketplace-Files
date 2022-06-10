/* eslint-disable no-lone-blocks */
import { useState } from "react";
import { acceptedCryptos as ac } from "../../../../API";
import { AcceptedCryptos } from "../../AcceptedCryptos/AcceptedCryptos";

import "../Home.css";

export const HomeHeaderContent = ({ popularServices }) => {
  const [acceptedCryptos /* , setAcceptedCryptos */] = useState(ac);

  return (
    <div className="content">
      <div className="heading">
        <div className="block"></div>
        <h1>
          Hire Professionals <br /> Pay with <em>Crypto</em>
        </h1>
      </div>
      <h3>Welcome to Pixul's Freelance Marketplace Beta 1.0</h3>
      <p>
        Discover and connect with creators, freelancers and innovators
        worldwide. <br /> Post a job or search for our platform for a creator
        and connect today.
      </p>
      <div className="trending">
        <label>Trending:</label>
        {popularServices?.length
          ? popularServices.map(service => (
              <label key={service.category}>{service.category}</label>
            ))
          : null}
      </div>
      <div className="btns">
        <a href="/">Discover</a>
        <a href="/">Learn More</a>
      </div>
      <AcceptedCryptos acceptedCryptos={acceptedCryptos} />
    </div>
  );
};
