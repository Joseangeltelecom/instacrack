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

  return (
    <nav className="navbar navbar-expand-lg navbar-dark  fixed-top">
      <div className="container-fluid">
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
            {/* <input
              type="text"
              clasName="form-control form-input"
              placeholder="Search anything..."
              prefix={<FontAwesomeIcon icon={solid("magnifying-glass")} />}
            /> */}
            <Input
              clasName="form-control form-input bg-dark"
              allowClear
              type="text"
              placeholder="Search anything..."
              prefix={<SearchOutlined />}
            />
          </div>
        </div>
        <div>
          <HomeFilled />
          <SendOutlined />
          <PlusCircleOutlined />
          <HeartOutlined />
        </div>
      </div>
    </nav>
  )
}

export default Navbar
