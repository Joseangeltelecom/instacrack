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
            <img src="https://elcomercio.pe/resizer/1AdR3_S-R4ZELHQ6WkNRGhkZhdc=/1200x900/smart/filters:format(jpeg):quality(75)/cloudfront-us-east-1.images.arcpublishing.com/elcomercio/BH5EJQD2ZZF5XGJM2AHNJW7HUI.jpg" />
          </Link>

          <Link style={{ color: "black" }} to="/profile">
            <b>{props.username}</b>
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
            <b>{props.username}</b> {props.caption}
          </span>
        </div>
      </div>
    </>
  )
}
