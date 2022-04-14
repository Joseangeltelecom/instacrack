import React from 'react'
import { useAuth } from '../../context/AuthContext'
import '../../styles/profile.css'

export const HeaderProfile = ({ filteredPosts }) => {
  const { user } = useAuth()
  return (
    <div className="row justify-content-center">
      <div
        className="col-2"
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start',
        }}
      >
        <img
          id="imgHeader"
          className="rounded-circle"
          src={
            user.currentUser.photoURL ||
            'https://elcomercio.pe/resizer/1AdR3_S-R4ZELHQ6WkNRGhkZhdc=/1200x900/smart/filters:format(jpeg):quality(75)/cloudfront-us-east-1.images.arcpublishing.com/elcomercio/BH5EJQD2ZZF5XGJM2AHNJW7HUI.jpg'
          }
        />
      </div>

      <div className="col-6 headerProfile2">
        <h2 style={{ fontWeight: 'lighter' }}>
          {user.extrainfo
            ? user.extrainfo.username
            : user.currentUser.displayName}
        </h2>
        <div className="row" style={{ fontSize: '16px' }}>
          <div>
            <b>{filteredPosts.length} </b>
            {filteredPosts.length == 1 ? 'publicación' : 'publicaciones'}
          </div>
        </div>
        <p style={{ marginTop: '15px', fontSize: '16px' }}>
          <b>{user.extrainfo ? user.extrainfo.fullname : ''}</b>
        </p>
        <div style={{ fontSize: '16px' }}></div>
      </div>
    </div>
  )
}
