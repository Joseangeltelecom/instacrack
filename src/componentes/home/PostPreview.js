import React, { useEffect, useState } from "react";
import "../../styles/home/postpreview.css";
import "../../styles/modalcard.css";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import { db } from "../../firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { Button } from "antd";
import { ModalHome } from "./ModalHome";
import Moment from "react-moment";
import { CloseOutlined } from "@ant-design/icons";

export const PostPreview = (props) => {
  const [isVisible, setIsVisible] = useState(false);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState([]);
  const { user } = useAuth();

  // Retriving comments:
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

  // Retriving Likes:
  useEffect(() => {
    if (props.postId) {
      const recentMessagesQuery = query(
        collection(db, "postPreview", props.postId, "likes")
      );
      onSnapshot(recentMessagesQuery, (snapshot) => {
        if (snapshot.docs.some((like) => like.id === user.currentUser.uid))
          setLiked(true);
        setLikes(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
        );
      });
    }
  }, [props.postId]);

  // Adding a comment:
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

  // Handling Like / dislike:
  const handleLike = (e) => {
    if (liked) {
      deleteDoc(
        doc(db, "postPreview", props.postId, "likes", user.currentUser.uid)
      );
      setLiked(false);
    } else {
      const likeRef = doc(
        db,
        "postPreview",
        props.postId,
        "likes",
        user.currentUser.uid
      );
      setDoc(likeRef, { like: user.currentUser.uid }, { merge: true });
      setLiked(true);
    }
  };

  return (
    <>
      <div className="container">
        <div className="header">
          <Link to={`/profile/${props.post.username}`}>
            <img src={props.post.imgProfile} />
          </Link>

          <Link
            style={{ color: "black" }}
            to={`/profile/${props.post.username}`}
          >
            <b>{props.post.username}</b>
          </Link>
        </div>
        <img
          className="post-photo"
          src={props.post.imagePostUrl}
          onClick={() => {
            setIsVisible(!isVisible);
          }}
        />

        <button className="like" onClick={handleLike}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className={liked ? "bi bi-heart liked" : "bi bi-heart-fill"}
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
            />
          </svg>

          <span className="px-2">{likes.length}</span>
        </button>

        <div className="comment-post-user">
          <span>
            <b>{props.post.username}</b> {props.post.caption}
          </span>
        </div>
        {
          <div className={comments.length > 0 ? "post__comments" : ""}>
            {comments.map((comment) => (
              <div className="comentario">
                <p>
                  <Link
                    style={{
                      color: "rgb(0,0,0,0.7)",
                    }}
                    to={`/profile/${comment.username}`}
                  >
                    <b>{comment.username}</b>
                  </Link>
                  {` ${comment.text}`}
                </p>
              </div>
            ))}
          </div>
        }
        {user && (
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
        )}
        <ModalHome estado={isVisible} setIsVisible={setIsVisible}>
          <div className="contenedor-de-imagen">
            <img src={props.post.imagePostUrl} />
          </div>
          <div className="contenedor-de-datos">
            <div className="headerr-posts">
              <img src={props.post.imgProfile} className="imagen-modal-post" />{" "}
              <b>{props.post.username}</b>
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
                <img
                  src={props.post.imgProfile}
                  className="imagen-modal-post"
                />{" "}
                <div className="container-caption-username">
                  <b>{props.post.username}</b>
                  <span> {props.post.caption}</span>
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
        </ModalHome>
      </div>
    </>
  );
};
