import React, { useEffect, useRef, useState } from "react";
import "../../styles/home/sliderfriends.css";
import "antd/dist/antd.css";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { collection, onSnapshot } from "firebase/firestore";
import { useAuth } from "../../context/AuthContext";
import { db } from "../../firebase";
import { NavLink } from "react-router-dom";

function SliderFriends() {
  const [users, setUsers] = useState([]);
  const { user } = useAuth();
  const filterUsers = users.filter((u) => {
    return u.id !== user.currentUser.uid;
  });

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

  // ------- funcionalidad del slider ---------

  const slideshow = useRef(null);

  const next = () => {
    if (slideshow.current.children.length > 6) {
      const primerElemento = slideshow.current.children[0];
      const segundoElemento = slideshow.current.children[1];
      slideshow.current.style.transition = `600ms ease-out all`;
      const tamanioSlide = slideshow.current.children[0].offsetWidth;

      slideshow.current.style.transform = `translateX(-${tamanioSlide * 2}px)`;

      const transition = () => {
        slideshow.current.style.transition = "none";
        slideshow.current.style.transform = `translateX(0)`;
        slideshow.current.appendChild(primerElemento);
        slideshow.current.appendChild(segundoElemento);
        slideshow.current.removeEventListener("transitionend", transition);
      };

      slideshow.current.addEventListener("transitionend", transition);
    } else if (slideshow.current.children.length == 6) {
      const primerElemento = slideshow.current.children[0];
      slideshow.current.style.transition = `600ms ease-out all`;
      const tamanioSlide = slideshow.current.children[0].offsetWidth;

      slideshow.current.style.transform = `translateX(-${tamanioSlide}px)`;

      const transition = () => {
        slideshow.current.style.transition = "none";
        slideshow.current.style.transform = `translateX(0)`;
        slideshow.current.appendChild(primerElemento);
        slideshow.current.removeEventListener("transitionend", transition);
      };

      slideshow.current.addEventListener("transitionend", transition);
    }
  };

  const prev = () => {
    if (slideshow.current.children.length > 6) {
      const index1 = slideshow.current.children.length - 1;
      const index2 = slideshow.current.children.length - 2;
      const ultimoElemento1 = slideshow.current.children[index1];
      const ultimoElemento2 = slideshow.current.children[index2];
      slideshow.current.insertBefore(
        ultimoElemento1,
        slideshow.current.firstChild
      );
      slideshow.current.insertBefore(
        ultimoElemento2,
        slideshow.current.firstChild
      );

      slideshow.current.style.transition = "none";
      const tamanioSlide = slideshow.current.children[0].offsetWidth;
      slideshow.current.style.transform = `translateX(-${tamanioSlide * 2}px)`;

      setTimeout(() => {
        slideshow.current.style.transition = `600ms ease-out all`;
        slideshow.current.style.transform = `translateX(0)`;
      }, 30);
    } else if (slideshow.current.children.length == 6) {
      const index1 = slideshow.current.children.length - 1;
      const ultimoElemento1 = slideshow.current.children[index1];
      slideshow.current.insertBefore(
        ultimoElemento1,
        slideshow.current.firstChild
      );

      slideshow.current.style.transition = "none";
      const tamanioSlide = slideshow.current.children[0].offsetWidth;
      slideshow.current.style.transform = `translateX(-${tamanioSlide}px)`;

      setTimeout(() => {
        slideshow.current.style.transition = `600ms ease-out all`;
        slideshow.current.style.transform = `translateX(0)`;
      }, 30);
    }
  };

  return (
    <>
      <div className="carrusel">
        <div className="slides-container" ref={slideshow}>
          {filterUsers.map((friend) => (
            <div className="slide" key={friend.user.username}>
              <NavLink
                className="navlink"
                to={`/profile/${friend.user.username}`}
              >
                <img
                  src={friend.user.imgProfile}
                  alt="Imagen de Perfil"
                  className="imagen"
                />
                <span className="spanuser">{`${friend.user.username
                  .split(" ")
                  .join("")
                  .slice(0, 10)}...`}</span>
              </NavLink>
            </div>
          ))}
        </div>
        <div className="controles">
          <button onClick={prev} className="leftbutton">
            <LeftOutlined className="iconoleft" />
          </button>
          <button onClick={next} className="rightbutton">
            <RightOutlined className="iconoright" />
          </button>
        </div>
      </div>
    </>
  );
}

export default SliderFriends;
