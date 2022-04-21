import React from 'react'
import Navbar from '../componentes/navbar/Navbar'

export const PostSaved = () => {
  return (
    <div
      style={{
        height: '100vh',
        width: '100vw',
        margin: '0',
        padding: '90px 0px 0px 0px',
        overflowX: 'hidden',
      }}
    >
      <Navbar />

      <div class="row justify-content-center">
        <div
          class="col-8"
          style={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <h1 style={{ color: 'rgb(255, 0, 0, 0.5)' }}>COMING SOON</h1>
        </div>
      </div>
    </div>
  )
}
