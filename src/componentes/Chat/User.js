import React, { useEffect, useState } from "react";
import Img from "../assets/image1.jpg";
import { onSnapshot, doc } from "firebase/firestore";
import { db } from "../../firebase";

const User = ({ user1, user, selectUser, chat }) => {
  console.log("user", user.username);
  console.log("chat", chat.username);
  const user2 = user?.uid;
  const [data, setData] = useState("");

  useEffect(() => {
    const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;
    let unsub = onSnapshot(doc(db, "lastMsg", id), (doc) => {
      setData(doc.data());
    });
    return () => unsub();
  }, []);

  return (
    <>
      <div
        className={`user_wrapper ${
          chat.username === user.username && "selected_user"
        }`}
        onClick={() => selectUser(user)}
      >
        <div className="user_info">
          <div className="user_detail">
            <img src={user.imgProfile || Img} alt="avatar" className="avatar" />
            <p>{user.username}</p>
            {data?.from !== user1 && data?.unread && (
              <small className="unread">New</small>
            )}
          </div>
          <div
            className={`user_status ${user.isOnline ? "online" : "offline"}`}
          ></div>
        </div>
        {data && (
          <p className="truncate">
            <strong>{data.from === user1 ? "Me:" : null}</strong>
            {data.text}
          </p>
        )}
      </div>
      <div
        onClick={() => selectUser(user)}
        className={`sm_container ${
          chat.username === user.username && "selected_user"
        }`}
      >
        <img
          src={user.imgProfile || Img}
          alt="avatar"
          className="avatar sm_screen"
        />
      </div>
    </>
  );
};

export default User;
