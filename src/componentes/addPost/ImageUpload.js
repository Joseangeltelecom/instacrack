import { Button } from "antd"
import {
  addDoc,
  collection,
  FieldValue,
  serverTimestamp,
} from "firebase/firestore"
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage"
import React, { useState } from "react"
import { useAuth } from "../../context/AuthContext"
import { db } from "../../firebase"

function ImageUpload(props) {
  const { user } = useAuth()
  const [image, setImage] = useState(null)
  const [progress, setProgress] = useState(0)
  const [caption, setCaption] = useState("")

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0])
    }
  }

  const handleUpload = () => {
    const storage = getStorage()
    const storageRef = ref(storage, `images/${image.name}`) //note that ref is not a function on storage -- it's a separately imported function
    const uploadTask = uploadBytesResumable(storageRef, image)

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        )
        setProgress(progress)
      },

      (error) => {
        console.log(error.message)
      },

      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          // post image inside db
          addDoc(collection(db, "postPreview"), {
            timestamp: serverTimestamp(),
            caption: caption,
            imagePostUrl: url,
            username: user.extrainfo
              ? user.extrainfo.username
              : user.currentUser.displayName,
            id: user.currentUser.uid,
          })

          setProgress(0)
          setCaption("")
          setImage(null)
          props.handleClose(false)
        })
      }
    )
  }

  return (
    <div>
      <progress value={progress} max="100" />
      <input
        type="text"
        placeholder="Enter a caption..."
        onChange={(e) => setCaption(e.target.value)}
        value={caption}
      />
      <input type="file" onChange={handleChange} />
      {image && (
        <div style={styles.preview}>
          <img
            src={URL.createObjectURL(image)}
            style={styles.image}
            alt="Thumb"
          />
          {/* <button onClick={removeSelectedImage} style={styles.delete}>
            Remove This Image
          </button> */}
        </div>
      )}
      <Button onClick={handleUpload}>Upload</Button>
    </div>
  )
}

export default ImageUpload

// Just some styles
const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 50,
  },
  preview: {
    marginTop: 50,
    display: "flex",
    flexDirection: "column",
  },
  image: { maxWidth: "100%", maxHeight: 320 },
  delete: {
    cursor: "pointer",
    padding: 15,
    background: "red",
    color: "white",
    border: "none",
  },
}
