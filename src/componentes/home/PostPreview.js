import React, { useEffect, useState } from "react";
import "../../styles/home/postpreview.css";
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

export const PostPreview = (props) => {
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
        <img className="post-photo" src={props.post.imagePostUrl} />

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
              fill-rule="evenodd"
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
      </div>
    </>
  );
};
