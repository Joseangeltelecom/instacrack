import React, { useEffect, useState } from "react"
import "../../styles/home/postpreview.css"
import { useAuth } from "../../context/AuthContext"
import { Link } from "react-router-dom"
import { db } from "../../firebase"
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore"
import { Button } from "antd"

export const PostPreview = (props) => {
  const [comments, setComments] = useState([])
  const [comment, setComment] = useState("")
  const [liked, setLiked] = useState(false)
  const [likes, setLikes] = useState([])
  const { user } = useAuth()

  // Retriving comments:
  useEffect(() => {
    if (props.postId) {
      const recentMessagesQuery = query(
        collection(db, "postPreview", props.postId, "comments"),
        orderBy("timestamp", "desc")
      )
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
      )
      return () => unsubuscribe()
    }
  }, [props.postId])

  // Adding a comment:
  const postComment = (e) => {
    e.preventDefault()
    const commentRef = collection(db, "postPreview", props.postId, "comments")
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
    )
  }

  // Giving a like:
  const handleLike = (e) => {
    const likeRef = collection(db, "postPreview", props.postId, "likes")
    addDoc(likeRef, { like: user.currentUser.uid }, { merge: true })
    setLiked(true)
  }

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

        {/* <div className="likes">
          <HeartOutlined onClick={handleLike} style={{ fontSize: "30px" }} />
          <span className="likes-count">
            <b>{props.post.likes}</b>
          </span>
        </div> */}

        <button className="like" onClick={handleLike}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            fill="currentColor"
            className={liked ? "bi bi-heart liked" : "bi bi-heart"}
            viewBox="0 0 16 14"
          >
            <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
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
              <div className="header">
                <Link to={`/profile/${comment.username}`}>
                  <img src={comment.imgProfile} />
                </Link>
                <p>
                  <Link
                    style={{
                      color: "black",
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
  )
}
