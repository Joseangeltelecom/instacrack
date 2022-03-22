import React from "react"
import "../../styles/home/postpreview.css"
import { HeartOutlined } from "@ant-design/icons"
import { useAuth } from "../../context/AuthContext"

export const PostPreview = (props) => {
  const { user } = useAuth()

  console.log(props)

  return (
    <>
      <div className="container">
        <div className="header">
          <a href="#">
            <img src={props.imageProfileUrl} />
          </a>

          <a>
            <b>{user.email}</b>
          </a>
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
