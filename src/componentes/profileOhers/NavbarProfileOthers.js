import { FolderOutlined, TableOutlined } from '@ant-design/icons'
import React from 'react'
import { NavLink, useParams } from 'react-router-dom'
import '../../styles/navbarprofile.css'

export const NavbarProfileOthers = () => {
  const { username } = useParams()
  console.log(' username ', username)
  return (
    <>
      <div
        class="row justify-content-center"
        style={{ fontSize: '14px', padding: '10px 0' }}
      >
        <div
          class="col-2"
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <TableOutlined style={{ color: 'gray' }} />
          <NavLink to={`/profile/${username}`} className="navlink">
            PUBLICACIONES
          </NavLink>
        </div>
        <div
          class="col-2"
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <FolderOutlined />
          <NavLink to="/postsaved" className="navlink">
            GUARDADO
          </NavLink>
        </div>
      </div>
    </>
  )
}
