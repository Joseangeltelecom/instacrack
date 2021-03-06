import React, { useEffect, useState } from 'react'

import { Dropdown, Menu } from 'antd'
import {
  BookOutlined,
  HeartOutlined,
  HomeFilled,
  SendOutlined,
  SyncOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { ModalChangeUser } from '../Profile/ModalChangeUser'
import { Link } from 'react-router-dom'
import { AddPostModal } from '../addPost/AddPostModal'
import { useAuth } from '../../context/AuthContext'
import SearchBar from './SearchBar'
import { db } from '../../firebase'
import { collection, onSnapshot } from 'firebase/firestore'

function Navbar() {
  const { logout, user } = useAuth()
  const [users, setUsers] = useState([])
  const handleLogout = async () => {
    try {
      await logout()
    } catch (error) {
      console.error(error.message)
    }
  }

  useEffect(() => {
    const addUsersFriends = onSnapshot(collection(db, 'users'), (snapshot) =>
      setUsers(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })),
      ),
    )
    return () => addUsersFriends()
  }, [])

  const menu = (
    <Menu style={{ width: '200px' }}>
      <Menu.Item>
        <UserOutlined />
        <Link className="ms-2" to="/profile">
          Perfil
        </Link>
      </Menu.Item>
      <Menu.Item>
        <BookOutlined />
        <Link className="ms-2" to="/postsaved">
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
    <nav className="navbar navbar-expand-lg navbar-dark fixed-top bg-white border-bottom p-0 m-0">
      <div className="container-fluid d-flex justify-content-sm-evenly justify-content-between  m-0 p-0">
        <div>
          <Link
            to="/home"
            style={{
              fontFamily: 'Lobster',
              color: 'black',
              fontSize: '35px',
              marginRight: '10px',
            }}
          >
            Instacrack
          </Link>
        </div>
        <div>
          <SearchBar data={users} placeholder="Search a friend" />
        </div>
        <div className="d-flex justify-content-center align-items-center">
          <Link to="/home" style={{ color: 'black' }}>
            <HomeFilled style={{ fontSize: '26px' }} />
          </Link>

          <Link to="/chat" style={{ color: 'black' }}>
            <SendOutlined style={{ fontSize: '26px' }} rotate={-25} />
          </Link>
          <a>
            <AddPostModal />
          </a>
          <a className="m-0">
            <Dropdown
              trigger="click"
              overlay={menu}
              placement="bottomRight"
              arrow
            >
              <img
                style={{
                  height: '35px',
                  width: '35px',
                  borderRadius: '50%',
                  marginRight: '0px',
                }}
                src={
                  user.currentUser.photoURL ||
                  'https://elcomercio.pe/resizer/1AdR3_S-R4ZELHQ6WkNRGhkZhdc=/1200x900/smart/filters:format(jpeg):quality(75)/cloudfront-us-east-1.images.arcpublishing.com/elcomercio/BH5EJQD2ZZF5XGJM2AHNJW7HUI.jpg'
                }
              />
            </Dropdown>
          </a>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
