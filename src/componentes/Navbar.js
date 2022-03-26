import React from "react"
import { useAuth } from "../context/AuthContext"
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
// import {
//   solid,
//   regular,
//   brands,
// } from "@fortawesome/fontawesome-svg-core/import.macro"; // <-- import styles to be used
import { Form, Input, Button, Dropdown, Menu } from "antd"
import {
  BookOutlined,
  HeartOutlined,
  HomeFilled,
  PlusCircleOutlined,
  SearchOutlined,
  SendOutlined,
  SyncOutlined,
  UserOutlined,
} from "@ant-design/icons"
import "../styles/navbar/navbar.css"
import { ModalChangeUser } from "./Profile/ModalChangeUser"
import { Link } from "react-router-dom"
import { AddPostModal } from "./addPost/AddPostModal"

function Navbar() {
  const { logout, user } = useAuth()

  const handleLogout = async () => {
    try {
      await logout()
    } catch (error) {
      console.error(error.message)
    }
  }

  const menu = (
    <Menu style={{ width: "200px" }}>
      <Menu.Item>
        <UserOutlined />
        <Link to="/profile" className="ms-2">
          Perfil
        </Link>
      </Menu.Item>
      <Menu.Item>
        <BookOutlined />
        <Link to="/postsaved" className="ms-2">
          Guardado
        </Link>
      </Menu.Item>
      <Menu.Item>
        <SyncOutlined />
        <ModalChangeUser name="Cambiar de Cuenta" />
      </Menu.Item>
      <Menu.Item className="border-top">
        <a onClick={handleLogout}>Salir</a>
      </Menu.Item>
    </Menu>
  )

  return (
    <nav className="navbar navbar-expand-lg navbar-dark fixed-top bg-white border-bottom">
      <div className="container-fluid d-flex justify-content-evenly">
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
          <div className="form">
            <div
              style={{ width: "230px", height: "35px", background: "gray" }}
              className="d-none d-sm-block rounded"
            >
              <Input
                className="w-100 h-100 rounded"
                allowClear
                type="text"
                placeholder="Buscar"
                prefix={<SearchOutlined />}
              />
            </div>
          </div>
        </div>
        <div className="d-flex flex-row justify-content-evenly">
          <Link to="/home" style={{ color: "black" }}>
            <HomeFilled style={{ fontSize: "26px" }} />
          </Link>

          <Link to="/chat" style={{ color: "black" }}>
            <SendOutlined
              className="ms-4"
              style={{ fontSize: "26px" }}
              rotate={-25}
            />
          </Link>
          <a>
            <AddPostModal />
          </a>
          <HeartOutlined className="ms-4" style={{ fontSize: "26px" }} />
          <a>
            <Dropdown
              trigger="click"
              overlay={menu}
              placement="bottomRight"
              arrow
            >
              <img
                style={{
                  height: "35px",
                  width: "35px",
                  borderRadius: "50%",
                  padding: "2px",
                  marginLeft: "25px",
                }}
                src="https://elcomercio.pe/resizer/1AdR3_S-R4ZELHQ6WkNRGhkZhdc=/1200x900/smart/filters:format(jpeg):quality(75)/cloudfront-us-east-1.images.arcpublishing.com/elcomercio/BH5EJQD2ZZF5XGJM2AHNJW7HUI.jpg"
              />
            </Dropdown>
          </a>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
