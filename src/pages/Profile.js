import React from "react";
import Navbar from "../componentes/Navbar";
import { HeaderProfile } from "../componentes/Profile/HeaderProfile";
import { NavbarProfile } from "../componentes/Profile/NavbarProfile";
import { PostProfile } from "../componentes/Profile/PostProfile";

export const Profile = () => {
  return (
    <div
      style={{
        // backgroundColor: "green",
        height: "100vh",
        width: "100vw",
        margin: "0",
        padding: "90px 0px 0px 0px",
        overflowX: "hidden",
      }}
    >
      <Navbar />
      <HeaderProfile />

      <NavbarProfile />
      <PostProfile />
    </div>
  );
};
