import React, { useState } from 'react'
import { PlusCircleOutlined } from '@ant-design/icons'
import { PhotoPreviewPost } from './PhotoPreviewPost'
import { FinalPostModal } from './FinalPostModal'

export function AddPostModal() {
  const [modalShow, setModalShow] = React.useState(false)
  const [modalShow2, setModalShow2] = React.useState(false)
  const [image, setImage] = useState(null)
  const handleClose = () => {
    setModalShow(false)
  }

  return (
    <>
      <div onClick={() => setModalShow(true)}>
        <PlusCircleOutlined style={{ fontSize: '26px', color: 'black' }} />
      </div>
      <PhotoPreviewPost
        image={image}
        setImage={setImage}
        show={modalShow}
        onHide={handleClose}
        setModalShow2={setModalShow2}
      />
      <FinalPostModal
        image={image}
        setImage={setImage}
        show={modalShow2}
        onHide={setModalShow2}
      />
    </>
  )
}
