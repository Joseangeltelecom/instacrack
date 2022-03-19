import React from "react";
import { PostPreview } from "../componentes/home/PostPreview";
import SliderFriends from "../componentes/home/SliderFriends";
import { UserChange } from "../componentes/home/UserChange";
import Navbar from "../componentes/Navbar";
import "../styles/home/home.css";

function Home() {
  return (
    <div className="home-container">
      <Navbar />
      <div className="post">
        <SliderFriends />
        <PostPreview />
      </div>
      <div>
        <UserChange />
      </div>
    </div>
  );
}

export default Home;
