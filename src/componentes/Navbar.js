import React from "react"
import { useAuth } from "../context/AuthContext"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  solid,
  regular,
  brands,
} from "@fortawesome/fontawesome-svg-core/import.macro" // <-- import styles to be used
import { Form, Input, Button } from "antd"
import {
  HeartOutlined,
  HomeFilled,
  PlusCircleOutlined,
  SearchOutlined,
  SendOutlined,
} from "@ant-design/icons"
import "../styles/navbar/navbar.css"

function Navbar() {
  const { logout, user } = useAuth()

  console.log(user)
  const handleLogout = async () => {
    try {
      await logout()
    } catch (error) {
      console.error(error.message)
    }
  }

  const style = {
    // Adding media query..
    "@media (max-width: 600px)": {
      display: "none",
    },
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark  fixed-top">
      <div className="container-fluid d-flex justify-content-evenly border-bottom">
        {/* <Button
          onClick={handleLogout}
          className="btn btn-light fw-bold rounded-pill m-2"
          hidden={user ? false : false}
        >
          Log out
        </Button> */}

        <div>
          <h2 style={{ fontFamily: "Lobster" }}>Instacrack</h2>
        </div>
        <div>
          <div clasName="form">
            <div style={{ width: "230px" }} className="d-none d-sm-block">
              <Input
                className="w-100"
                allowClear
                type="text"
                prefix={<SearchOutlined />}
              />
            </div>
          </div>
        </div>
        <div clasName="d-flex flex-row justify-content-evenly">
          <HomeFilled style={{ fontSize: "26px" }} />
          <SendOutlined
            className="ms-4"
            style={{ fontSize: "26px" }}
            rotate={-25}
          />
          <PlusCircleOutlined className="ms-4" style={{ fontSize: "26px" }} />
          <HeartOutlined className="ms-4" style={{ fontSize: "26px" }} />
        </div>
      </div>
    </nav>
  )
}

export default Navbar
