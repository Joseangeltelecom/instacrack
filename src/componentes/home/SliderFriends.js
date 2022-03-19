import React from "react";
import "../../styles/home/sliderfriends.css";
import "antd/dist/antd.css";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Button } from "antd";

function SliderFriends() {
  return (
    <>
      <div className="carrusel">
        <Button
          shape="circle"
          ghost="true"
          icon={<LeftOutlined style={{ fontSize: "15px" }} />}
        ></Button>

        <div className="carrusel-list">
          <div className="carrusel-item">
            <div className="image-container">
              <img
                src="https://elcomercio.pe/resizer/1AdR3_S-R4ZELHQ6WkNRGhkZhdc=/1200x900/smart/filters:format(jpeg):quality(75)/cloudfront-us-east-1.images.arcpublishing.com/elcomercio/BH5EJQD2ZZF5XGJM2AHNJW7HUI.jpg"
                alt="Tengen Uzui bien papi"
              />
              <span>tupapitengen</span>
            </div>
          </div>
        </div>

        <Button
          shape="circle"
          ghost="true"
          icon={<RightOutlined style={{ fontSize: "15px" }} />}
        ></Button>
      </div>

      <div className="carrusel-indicators"></div>
    </>
  );
}

export default SliderFriends;
