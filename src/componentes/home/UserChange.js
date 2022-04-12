import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import '../../styles/home/userchange.css'
import { ModalChangeUser } from '../Profile/ModalChangeUser'

export const UserChange = () => {
  const { user } = useAuth()
  return (
    <div className="container-userchange">
      <Link to="/profile">
        <div className="image-container-userchange">
          <img
            src={
              user.currentUser.photoURL ||
              'https://elcomercio.pe/resizer/1AdR3_S-R4ZELHQ6WkNRGhkZhdc=/1200x900/smart/filters:format(jpeg):quality(75)/cloudfront-us-east-1.images.arcpublishing.com/elcomercio/BH5EJQD2ZZF5XGJM2AHNJW7HUI.jpg'
            }
          />
        </div>
      </Link>
      <div className="username-container">
        <Link to="/profile" style={{ color: 'black' }}>
          {user.extrainfo ? user.extrainfo.username : ''}
        </Link>
        <span className="username-gray">
          {user.extrainfo ? user.extrainfo.fullname : ''}
        </span>
      </div>
      <div className="change-user">
        <ModalChangeUser name="Cambiar" />
      </div>
    </div>
  )
}
