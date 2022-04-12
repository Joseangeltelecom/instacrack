import { CloseOutlined } from "@ant-design/icons";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import Moment from "react-moment";
import { db } from "../../firebase";
import "../../styles/modalcard.css";
import "../../styles/home/postpreview.css";
import { ModalCard } from "./ModalCard";
import { Button } from "antd";
import { useAuth } from "../../context/AuthContext";

export const PostProfile = (props) => {
  const [isVisible, setIsVisible] = useState(false);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const { user } = useAuth();

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

  // Agregando Comentario
  const postComment = (e) => {
    e.preventDefault();
    const commentRef = collection(db, "postPreview", props.postId, "comments");
    addDoc(
      commentRef,
      {
        text: comment,
        username: user.extrainfo
          ? user.extrainfo.username
          : user.currentUser.displayName,
        fullname: "",
        imgProfile:
          user.currentUser.photoURL ||
          "https://elcomercio.pe/resizer/1AdR3_S-R4ZELHQ6WkNRGhkZhdc=/1200x900/smart/filters:format(jpeg):quality(75)/cloudfront-us-east-1.images.arcpublishing.com/elcomercio/BH5EJQD2ZZF5XGJM2AHNJW7HUI.jpg",
        timestamp: serverTimestamp(),
      },
      { merge: true }
    );
    setComment("");
  };

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
      <ModalCard estado={isVisible} setIsVisible={setIsVisible}>
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
          <form className="comment__form">
            <div className="comment__wrapper">
              <input
                className="comment__Input"
                type="text"
                placeholder="Add a comment..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <Button disabled={!comment} onClick={postComment} type="submit">
                Publicar
              </Button>
            </div>
          </form>
        </div>
      </ModalCard>
    </>
  );
};
