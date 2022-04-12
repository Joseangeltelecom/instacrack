import { Modal } from 'react-bootstrap'
import React, { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { db } from '../../firebase'
import { Button, Progress } from 'antd'
import { Editor } from '@tinymce/tinymce-react'
import { Link } from 'react-router-dom'

export function FinalPostModal(props) {
  const [progress, setProgress] = useState(0)
  const [caption, setCaption] = useState('')
  const { user } = useAuth()

  const handleUpload = () => {
    const storage = getStorage()
    const storageRef = ref(storage, `images/${props.image.name}`) //note that ref is not a function on storage -- it's a separately imported function
    const uploadTask = uploadBytesResumable(storageRef, props.image)

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
        )
        setProgress(progress)
      },

      (error) => {
        console.log(error.message)
      },

      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          // post props.image inside db
          addDoc(collection(db, 'postPreview'), {
            timestamp: serverTimestamp(),
            caption: caption,
            imagePostUrl: url,
            username: user.extrainfo
              ? user.extrainfo.username
              : user.currentUser.displayName,
            id: user.currentUser.uid,
            imgProfile:
              user.currentUser.photoURL ||
              'https://elcomercio.pe/resizer/1AdR3_S-R4ZELHQ6WkNRGhkZhdc=/1200x900/smart/filters:format(jpeg):quality(75)/cloudfront-us-east-1.images.arcpublishing.com/elcomercio/BH5EJQD2ZZF5XGJM2AHNJW7HUI.jpg',
          })

          setProgress(0)
          setCaption('')
          props.setImage(null)
          props.onHide(false)
        })
      },
    )
  }

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header className="d-flex flex-column p-0 m-0">
        <Progress percent={progress} />
        <div className="d-flex justify-content-between w-100">
          <div></div>
          <p>Crea una Nueva publicación</p>
          <Button className="me-2" onClick={handleUpload}>
            Upload
          </Button>
        </div>
      </Modal.Header>

      <Modal.Body className="d-flex justify-content-between p-0 m-0">
        {props.image && (
          <div style={styles.preview}>
            <img
              src={URL.createObjectURL(props.image)}
              style={styles.image}
              alt="Thumb"
            />
          </div>
        )}
        <div className="d-flex flex-column w-100">
          <div className="header">
            <Link to="/profile">
              <img
                src={
                  user.currentUser.photoURL ||
                  'https://elcomercio.pe/resizer/1AdR3_S-R4ZELHQ6WkNRGhkZhdc=/1200x900/smart/filters:format(jpeg):quality(75)/cloudfront-us-east-1.images.arcpublishing.com/elcomercio/BH5EJQD2ZZF5XGJM2AHNJW7HUI.jpg'
                }
              />
            </Link>

            <Link style={{ color: 'black' }} to="/profile">
              <b>
                {user.extrainfo
                  ? user.extrainfo.username
                  : user.currentUser.displayName}
              </b>
            </Link>
          </div>
          <Editor
            init={{
              plugins: 'emoticons',
              toolbar: 'emoticons',
              toolbar_location: 'bottom',
              menubar: false,
            }}
            outputFormat="text"
            onEditorChange={(newText) => setCaption(newText)}
          />
        </div>
      </Modal.Body>
    </Modal>
  )
}
// Just some styles
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  preview: {
    display: 'flex',
    flexDirection: 'column',
  },
  image: { maxWidth: '100%', maxHeight: '100%' },
  delete: {
    cursor: 'pointer',
    padding: 15,
    background: 'red',
    color: 'white',
    border: 'none',
  },
}
