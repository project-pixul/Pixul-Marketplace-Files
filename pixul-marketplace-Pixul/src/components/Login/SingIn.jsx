import React, { useState } from "react";
import SingInForm from "./SingInForm/SingInForm";
import SingUpForm from "./SingUpForm/SingUpForm";

import "./singin.css";

const SingIn = () => {
  let [singInMode, setSingInMode] = useState(true);

  const changeSingInMode = () => {
    setSingInMode(!singInMode);
  };

  return (
    <div className="sing-in-container">
      <label className="sing-in-title">
        {singInMode ? "WELCOME TO THE COLLECTIVE" : "CREATE YOUR TCC ACCOUNT"}
      </label>
      <div className="button-container">
        <span
          className={`sing-in-button  ${singInMode ? "active" : ""}`}
          onClick={changeSingInMode}
        >
          SING IN
        </span>
        <span
          className={`sing-in-button ${!singInMode ? "active" : ""}`}
          onClick={changeSingInMode}
        >
          SING UP
        </span>
      </div>
      <div className="form-container">
        {singInMode ? <SingInForm /> : <SingUpForm />}
      </div>
      {singInMode ? (
        <div className="reset-password-container">
          <p>
            Forgot your password? <a href="!#">Click Here</a>
          </p>
        </div>
      ) : null}
    </div>
  );
};

export default SingIn;
