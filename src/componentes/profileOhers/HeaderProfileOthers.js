import React from 'react'
import { useParams } from 'react-router-dom'

export const HeaderProfileOthers = (props) => {
  const { username } = useParams()

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
        <img id="imgHeader" className="rounded-circle" src={props.imgProfile} />
      </div>

      <div className="col-6 headerProfile2">
        <h2 style={{ fontWeight: 'lighter' }}>{username}</h2>
        <div className="row" style={{ fontSize: '16px' }}>
          <div>
            <b className="me-1">{props.filteredPosts.length}</b>
            {props.filteredPosts.length == 1 ? 'publicación' : 'publicaciones'}
          </div>
        </div>
        <p style={{ marginTop: '15px', fontSize: '16px' }}>
          <b>{props.fullname}</b>
        </p>
      </div>
    </div>
  )
}
