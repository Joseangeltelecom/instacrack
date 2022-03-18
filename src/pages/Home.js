import React from "react";
import { PostPreview } from "../componentes/home/PostPreview";
import Navbar from "../componentes/Navbar";

function Home() {
  return (
    <div className="home-container">
      <Navbar />
      <PostPreview />
    </div>
  );
}

export default Home;
