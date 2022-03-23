import { Modal } from "react-bootstrap"
import React, { useState } from "react"
import { useAuth } from "../../context/AuthContext"
import {
  CheckCircleFilled,
  LockOutlined,
  UserOutlined,
} from "@ant-design/icons"
import { Link, useNavigate } from "react-router-dom"
import { Button, Form, Input } from "antd"

function MyVerticallyCenteredModal(props) {
  const handleClose = () => {
    props.onHide(false)
    props.setModalShow2(true)
  }
  const { user } = useAuth()
  return (
    <Modal
      {...props}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Cambiar de cuenta
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="d-flex justify-content-between">
        <p>{user.extrainfo.username}</p>
        <div className="ms-5">
          <CheckCircleFilled />
        </div>
      </Modal.Body>
      <Modal.Footer
        style={{ background: "0597f6" }}
        className="d-flex justify-content-center"
      >
        <a style={{ background: "0597f6" }} onClick={handleClose}>
          Iniciar sesión en una cuenta
        </a>
      </Modal.Footer>
    </Modal>
  )
}
export function ModalChangeSession(props) {
  const [user, setUser] = useState({
    email: "",
    password: "",
  })
  const { login, loginWithGoogle } = useAuth()
  const [error, setError] = useState("")
  let navigate = useNavigate()

  const handleSubmit = async (e) => {
    setError("")
    try {
      await login(user.email, user.password)
      props.onHide(false)
      navigate("/home")
    } catch (error) {
      setError(error.message)
    }
  }

  const handleChange = ({ target: { value, name } }) =>
    setUser({ ...user, [name]: value })

  const handleGoogleSignin = async () => {
    try {
      await loginWithGoogle()
      props.onHide(false)
      navigate("/home")
    } catch (error) {
      setError(error.message)
    }
  }

  const onFinishFailed = (errorInfo) => {
    setError(errorInfo)
  }

  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton></Modal.Header>

      <Modal.Body className="d-flex justify-content-between">
        {/* <div
          style={{
            display: "flex",
            justifyContent: "center",
            textAlign: "center",
            flexDirection: "column",
          }}
        > */}
        <div
          style={{
            width: "400px",
            margin: "10px auto 10px",
            background: "#FFFFFF",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            textAlign: "center",
            padding: "0px 50px",
          }}
        >
          <h1 style={{ fontFamily: "Lobster" }}>Instacrack</h1>

          <p className="text-danger">{error}</p>

          <Form
            name="basic"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 50,
            }}
            initialValues={{
              remember: true,
            }}
            onFinish={handleSubmit}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Input
              className="mb-2"
              size="large"
              placeholder="Ingresa tu correo"
              prefix={<UserOutlined />}
              onChange={handleChange}
              name="email"
            ></Input>

            <Input.Password
              className="mb-2"
              size="large"
              prefix={<LockOutlined />}
              name="password"
              onChange={handleChange}
              placeholder="Ingresa tu contraseña"
            />

            <Button
              style={{
                width: "100%",
              }}
              type="primary"
              htmlType="submit"
            >
              Iniciar sesión
            </Button>

            <hr />

            <a
              onClick={handleGoogleSignin}
              style={{
                marginBottom: "15px",
                color: "#385189",
                fontWeight: "bold",
              }}
            >
              Iniciar Sesión con Google
            </a>
            <br />

            <div
              style={{
                marginBottom: "20px",
              }}
            >
              <Link to="/reset">¿Olvidaste tu Contraseña?</Link>
            </div>
          </Form>
        </div>

        {/* </div> */}
      </Modal.Body>
    </Modal>
  )
}

export function ModalChangeUser(props) {
  const [modalShow, setModalShow] = React.useState(false)
  const [modalShow2, setModalShow2] = React.useState(false)

  const handleClose = () => {
    setModalShow(false)
  }

  return (
    <>
      <a className="ms-2" variant="primary" onClick={() => setModalShow(true)}>
        {props.name}
      </a>
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={handleClose}
        setModalShow2={setModalShow2}
      />
      <ModalChangeSession show={modalShow2} onHide={setModalShow2} />
    </>
  )
}
