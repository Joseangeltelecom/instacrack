import React from "react";
import "../../styles/home/userchange.css";

export const UserChange = () => {
  return (
    <div className="container-userchange">
      <div className="image-container-userchange">
        <img src="https://elcomercio.pe/resizer/1AdR3_S-R4ZELHQ6WkNRGhkZhdc=/1200x900/smart/filters:format(jpeg):quality(75)/cloudfront-us-east-1.images.arcpublishing.com/elcomercio/BH5EJQD2ZZF5XGJM2AHNJW7HUI.jpg" />
      </div>
      <div className="username-container">
        <a>
          <b>tupapitengen</b>
        </a>
        <span className="username-gray">
          <b>Tengen Uzui</b>
        </span>
      </div>
      <div className="change-user">
        <a href="#">
          <b>Cambiar</b>
        </a>
      </div>
    </div>
  );
};
