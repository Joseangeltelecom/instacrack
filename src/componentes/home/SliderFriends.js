import React, { useEffect, useState } from "react";
import "../../styles/home/sliderfriends.css";
import "antd/dist/antd.css";
import GliderComponent from "react-glider-carousel";
import { collection, onSnapshot } from "firebase/firestore";
import { useAuth } from "../../context/AuthContext";
import { db } from "../../firebase";
import { NavLink, useParams } from "react-router-dom";

function SliderFriends() {
  const [users, setUsers] = useState([]);
  const { user } = useAuth();
  const filterUsers = users.filter((u) => {
    return u.id !== user.currentUser.uid;
  });

  const params = useParams();
  console.log(params);

  useEffect(() => {
    const addUsersFriends = onSnapshot(collection(db, "users"), (snapshot) =>
      setUsers(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          user: doc.data(),
        }))
      )
    );
    return () => addUsersFriends();
  }, []);

  return (
    <>
      <div className="carrusel">
        <GliderComponent
          hasArrows={true}
          slidesToShow={4}
          slidesToScroll={2}
          draggable={true}
        >
          {filterUsers.map((friend) => (
            <div
              className="glider-slide active center visible"
              key={friend.user.username}
            >
              <NavLink to={`/profile/${friend.user.username}`}>
                <img
                  src={friend.user.imgProfile}
                  alt="Imagen de Perfil"
                  className="imagen"
                />
              </NavLink>
              <span>{`${friend.user.username
                .split(" ")
                .join("")
                .slice(0, 10)}...`}</span>
            </div>
          ))}
        </GliderComponent>
      </div>
    </>
  );
}

export default SliderFriends;
