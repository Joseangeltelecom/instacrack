import React from "react";
import "../../styles/home/postpreview.css";
import { HeartOutlined } from "@ant-design/icons";

export const PostPreview = () => {
  return (
    <>
      <div className="container">
        <div className="header">
          <a href="">
            <img src="https://elcomercio.pe/resizer/1AdR3_S-R4ZELHQ6WkNRGhkZhdc=/1200x900/smart/filters:format(jpeg):quality(75)/cloudfront-us-east-1.images.arcpublishing.com/elcomercio/BH5EJQD2ZZF5XGJM2AHNJW7HUI.jpg" />
          </a>

          <a>
            <b>tupapitengen</b>
          </a>
        </div>
        <img
          className="post-photo"
          src="https://zonadeprensard.com/wp-content/uploads/2022/03/Tengen-Uzui-Praying-Demon-Slayer-1200x675.jpg"
        />
        <div className="likes">
          <HeartOutlined style={{ fontSize: "30px" }} />
          <span className="likes-count">
            <b>10</b>
          </span>
        </div>

        <div className="comment-post-user">
          <span>
            <b>tupapitengen</b> Aqui casual... bien papi como siempre :3
          </span>
        </div>
      </div>

      <div className="container">
        <div className="header">
          <a href="">
            <img src="https://elcomercio.pe/resizer/1AdR3_S-R4ZELHQ6WkNRGhkZhdc=/1200x900/smart/filters:format(jpeg):quality(75)/cloudfront-us-east-1.images.arcpublishing.com/elcomercio/BH5EJQD2ZZF5XGJM2AHNJW7HUI.jpg" />
          </a>

          <a>
            <b>tupapitengen</b>
          </a>
        </div>
        <img
          className="post-photo"
          src="https://zonadeprensard.com/wp-content/uploads/2022/03/Tengen-Uzui-Praying-Demon-Slayer-1200x675.jpg"
        />
        <div className="likes">
          <HeartOutlined style={{ fontSize: "30px" }} />
          <span className="likes-count">
            <b>10</b>
          </span>
        </div>

        <div className="comment-post-user">
          <span>
            <b>tupapitengen</b> Aqui casual... bien papi como siempre :3
          </span>
        </div>
      </div>
    </>
  );
};
