import { Modal } from "react-bootstrap"
import React, { useRef } from "react"
import { Button } from "antd"
import "./PhotoPreviewPost.css"

export function PhotoPreviewPost(props) {
  const ref = useRef()
  const handleImage = (e) => {
    if (e.target.files[0]) {
      props.setImage(e.target.files[0])
    }
  }

  const handleClose = () => {
    props.onHide(false)
    props.setModalShow2(true)
  }

  const handleRemoveImage = () => {
    props.setImage()
    ref.current.value = ""
  }

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      closeButton
    >
      <Modal.Header
        className="align-self-center"
        id="contained-modal-title-vcenter"
      >
        Crea una nueva publicación
      </Modal.Header>

      <Modal.Body className="d-flex flex-column align-self-center justify-content-center">
        <div className="d-flex align-self-center justify-content-center">
          <input
            type="file"
            name="file-1"
            id="file-1"
            onChange={handleImage}
            className="inputfile inputfile-1 align-self-center  "
            data-multiple-caption="{count} archivos seleccionados"
            multiple
            ref={ref}
          />

          <label for="file-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="iborrainputfile"
              width="20"
              height="17"
              viewBox="0 0 20 17"
            >
              <path d="M10 0l-5.2 4.9h3.3v5.1h3.8v-5.1h3.3l-5.2-4.9zm9.3 11.5l-3.2-2.1h-2l3.4 2.6h-3.5c-.1 0-.2.1-.2.1l-.8 2.3h-6l-.8-2.2c-.1-.1-.1-.2-.2-.2h-3.6l3.4-2.6h-2l-3.2 2.1c-.4.3-.7 1-.6 1.5l.6 3.1c.1.5.7.9 1.2.9h16.3c.6 0 1.1-.4 1.3-.9l.6-3.1c.1-.5-.2-1.2-.7-1.5z"></path>
            </svg>
            <span class="iborrainputfile">Seleccionar de la computadora</span>
          </label>
        </div>

        <div>
          {props.image && (
            <div style={styles.preview}>
              <img
                src={URL.createObjectURL(props.image)}
                style={styles.image}
                alt="Thumb"
              />

              <button onClick={handleRemoveImage} style={styles.delete}>
                Remove
              </button>
            </div>
          )}
        </div>
      </Modal.Body>
      <Modal.Footer
        style={{ background: "0597f6" }}
        className="d-flex justify-content-center"
      >
        <Button onClick={handleClose}>Aceptar</Button>
      </Modal.Footer>
    </Modal>
  )
}

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
