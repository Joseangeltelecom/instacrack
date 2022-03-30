import React, { useEffect, useState } from "react"
import "../../styles/home/postpreview.css"
import { HeartOutlined } from "@ant-design/icons"
import { useAuth } from "../../context/AuthContext"
import { Link } from "react-router-dom"
import { db } from "../../firebase"
import { addDoc, collection, onSnapshot } from "firebase/firestore"
import { Button } from "antd"

export const PostPreview = (props) => {
  const [comments, setComments] = useState([])
  const [comment, setComment] = useState("")
  const { user } = useAuth()

  useEffect(() => {
    if (props.postId) {
      const unsubuscribe = onSnapshot(
        collection(db, "postPreview", props.postId, "comments"),
        (snapshot) =>
          setComments(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              post: doc.data(),
            }))
          )
      )
      return () => unsubuscribe()
    }
  }, [props.postId])

  console.log("comments", comments)

  const postComment2 = (e) => {
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
        // timestamp: fb.firestore.FieldValue.serverTimestamp(),
      },
      { merge: true }
    )
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
        <div className="likes">
          <HeartOutlined style={{ fontSize: "30px" }} />
          <span className="likes-count">
            <b>{props.post.likes}</b>
          </span>
        </div>

        <div className="comment-post-user">
          <span>
            <b>{props.post.username}</b> {props.post.caption}
          </span>
        </div>
        {
          <div className={comments.length > 0 ? "post__comments" : ""}>
            {comments.map((comment) => (
              <div className="header">
                <Link to={`/profile/${comment.post.username}`}>
                  <img src={comment.post.imgProfile} />
                </Link>
                <p>
                  <Link
                    style={{ color: "black" }}
                    to={`/profile/${comment.post.username}`}
                  >
                    <b>{comment.post.username}</b>
                  </Link>
                  {` ${comment.post.text}`}
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
              <Button disabled={!comment} onClick={postComment2} type="submit">
                Publicar
              </Button>
            </div>
          </form>
        )}
      </div>
    </>
  )
}
