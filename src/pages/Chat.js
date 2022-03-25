import { DownOutlined } from "@ant-design/icons";
import React from "react";
import Navbar from "../componentes/Navbar";
import { ModalChangeUser } from "../componentes/Profile/ModalChangeUser";
import { useAuth } from "../context/AuthContext";

function Chat() {
  const { user } = useAuth();

  const friends = [
    {
      userName: "Krilin23",
      profileImage:
        "https://pbs.twimg.com/profile_images/1495762569130295300/adqfHmdl_400x400.jpg",
    },
    {
      userName: "goku",
      profileImage:
        "https://elcomercio.pe/resizer/pfVziOV4X8Vu9nwknDc-oNItlB8=/1200x900/smart/filters:format(jpeg):quality(75)/cloudfront-us-east-1.images.arcpublishing.com/elcomercio/6Y2EDIISGFGVFANEVDCR5LCG34.jpg",
    },
    {
      userName: "Vegeta",
      profileImage:
        "http://pm1.narvii.com/6596/8140f88dad609e7be2925cca0bcaa3b7219bdfe4_00.jpg",
    },
  ];

  console.log(friends);
  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        margin: "0",
        padding: "90px 0px 0px 0px",
        overflowX: "hidden",
      }}
    >
      <Navbar />

      <div class="row justify-content-center">
        <div
          class="col-3"
          style={{
            border: "1px solid rgb(0, 0, 0, 0.2)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "60px",
          }}
        >
          <ModalChangeUser
            name={
              <b
                style={{
                  color: "black",
                  marginRight: "5px",
                  fontSize: "16px",
                }}
              >
                {user.extrainfo.username}
              </b>
            }
          />
          <DownOutlined style={{ color: "black", fontSize: "16px" }} />
        </div>
        <div
          class="col-5"
          style={{
            border: "1px solid rgb(0, 0, 0, 0.2)",
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            paddingLeft: "30px",
          }}
        >
          <a href="">
            <img
              src="https://i.ibb.co/xLTxbSC/fondo-jean-2.png"
              alt="fondo-jean-2"
              border="0"
              style={{ height: "30px", width: "30px", borderRadius: "50%" }}
            />
          </a>
          <a href="" style={{ color: "black", marginLeft: "10px" }}>
            <b> Friend Name</b>
          </a>
        </div>
      </div>
      <div class="row justify-content-center">
        <div
          class="col-3"
          style={{
            border: "1px solid rgb(0,0,0,0.2)",
            height: "455px",
            overflowY: "scroll",
            padding: "0",
            display: "flex",
            flexDirection: "column",
            paddingTop: "10px",
          }}
        >
          {friends.map((friend) => (
            <div
              style={{
                padding: "10px",
                paddingLeft: "20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
                height: "80px",
              }}
            >
              <a href="">
                <img
                  src={friend.profileImage}
                  alt="fondo-jean-2"
                  border="0"
                  style={{ height: "60px", width: "60px", borderRadius: "50%" }}
                />
              </a>
              <a href="" style={{ color: "black", marginLeft: "10px" }}>
                {friend.userName}
              </a>
            </div>
          ))}
        </div>
        <div
          class="col-5"
          style={{
            border: "1px solid rgb(0,0,0,0.2)",
            height: "455px",
            overflowY: "scroll",
          }}
        >
          Chat
        </div>
      </div>
    </div>
  );
}

export default Chat;
