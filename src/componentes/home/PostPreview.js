import React from "react"
import "../../styles/home/postpreview.css"
import { HeartOutlined } from "@ant-design/icons"
import { useAuth } from "../../context/AuthContext"
import { Link } from "react-router-dom"

export const PostPreview = (props) => {
  const { user } = useAuth()
  console.log(user)
  return (
    <>
      <div className="container">
        <div className="header">
          <Link to="/profile">
            <img src={props.imageProfileUrl} />
          </Link>

          <Link style={{ color: "black" }} to="/profile">
            <b>{user.extrainfo.username}</b>
          </Link>
        </div>
        <img className="post-photo" src={props.imagePostUrl} />
        <div className="likes">
          <HeartOutlined style={{ fontSize: "30px" }} />
          <span className="likes-count">
            <b>{props.likes}</b>
          </span>
        </div>

        <div className="comment-post-user">
          <span>
            <b>{user.email}</b> {props.caption}
          </span>
        </div>
      </div>
    </>
  )
}
