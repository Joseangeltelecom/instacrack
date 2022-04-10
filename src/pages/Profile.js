import { collection, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import Navbar from "../componentes/Navbar";
import { HeaderProfile } from "../componentes/Profile/HeaderProfile";
import { NavbarProfile } from "../componentes/Profile/NavbarProfile";
import { PostProfile } from "../componentes/Profile/PostProfile";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase";

export const Profile = () => {
  const [postPreview, setPostPreview] = useState([]);
  const { user } = useAuth();

  const filteredPosts = postPreview.filter((u) => {
    return u.post.id == user.currentUser.uid;
  });

  useEffect(() => {
    const unsubuscribe = onSnapshot(collection(db, "postPreview"), (snapshot) =>
      setPostPreview(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          post: doc.data(),
        }))
      )
    );
    return () => unsubuscribe();
  }, []);

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
      <HeaderProfile filteredPosts={filteredPosts} />
      <NavbarProfile />

      <div className="row justify-content-center">
        <div
          className="col-8"
          style={{
            display: "flex",
            justifyContent: "flex-start",
            flexWrap: "wrap",
          }}
        >
          {filteredPosts.map(({ id, post }) => (
            <PostProfile key={id} {...post} postId={id} />
          ))}
        </div>
      </div>
    </div>
  );
};
