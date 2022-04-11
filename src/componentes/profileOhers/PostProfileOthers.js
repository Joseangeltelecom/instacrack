import { CloseOutlined } from "@ant-design/icons";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import { ModalCardOthers } from "./ModalCardOthers";
import "../../styles/modalcard.css";
import Moment from "react-moment";

export const PostProfileOthers = (props) => {
  const [isVisible, setIsVisible] = useState(false);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    if (props.postId) {
      const recentMessagesQuery = query(
        collection(db, "postPreview", props.postId, "comments"),
        orderBy("timestamp", "desc")
      );
      const unsubuscribe = onSnapshot(
        recentMessagesQuery,
        orderBy("timestamp", "desc"),
        (snapshot) =>
          setComments(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }))
          )
      );
      return () => unsubuscribe();
    }
  }, [props.postId]);

  return (
    <>
      <div
        style={{ margin: "12px", cursor: "pointer" }}
        onClick={() => {
          setIsVisible(!isVisible);
        }}
      >
        <img
          src={props.imagePostUrl}
          style={{ width: "270px", height: "270px" }}
        />
      </div>
      <ModalCardOthers estado={isVisible}>
        <div className="contenedor-de-imagen">
          <img src={props.imagePostUrl} />
        </div>
        <div className="contenedor-de-datos">
          <div className="headerr-posts">
            <img src={props.imgProfile} className="imagen-modal-post" />{" "}
            <b>{props.username.trim()}</b>
            <button
              onClick={() => {
                setIsVisible(!isVisible);
              }}
            >
              <CloseOutlined style={{ fontSize: "20px" }} />
            </button>
          </div>
          <div className="comments-post-moda">
            <div className="caption-post">
              <img src={props.imgProfile} className="imagen-modal-post" />{" "}
              <div className="container-caption-username">
                <b>{props.username}</b>
                <span> {props.caption}</span>
              </div>
            </div>
            {comments.map((c) => (
              <div key={c.id} className="comentarios-container">
                <img src={c.imgProfile} className="imagen-modal-comment" />{" "}
                <div className="container-caption-username">
                  <div>
                    <b>{c.username}</b>
                    <span> {c.text}</span>
                  </div>

                  <small>
                    <Moment fromNow>{c.timestamp.toDate()}</Moment>
                  </small>
                </div>
              </div>
            ))}
          </div>
        </div>
      </ModalCardOthers>
    </>
  );
};
