import React, { useState } from "react"
import { Form, Input, Button } from "antd"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

function Register() {
  const [error, setError] = useState("")
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
    fullname: "",
  })
  const { signup, loginWithGoogle, resetPassword } = useAuth()

  let navigate = useNavigate()

  const handleSubmit = async (e) => {
    setError("")
    try {
      await signup(user.email, user.password, user.username, user.fullname)
      navigate("/home")
    } catch (error) {
      setError(error.message)
    }
  }

  const onFinishFailed = (errorInfo) => {
    setError(errorInfo)
  }

  const handleGoogleSignin = async () => {
    try {
      await loginWithGoogle()
      navigate("/home")
    } catch (error) {
      setError(error.message)
    }
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        textAlign: "center",
        flexDirection: "column",
        marginBottom: "30px",
      }}
    >
      <div
        style={{
          width: "400px",
          margin: "30px auto 10px",
          background: "#FFFFFF",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          textAlign: "center",
          padding: "0px 50px",
          border: "1px solid #DDDDDD",
        }}
      >
        <div
          style={{
            margin: "30px 0px 0px 0px",
          }}
        >
          <h1 style={{ fontFamily: "Lobster" }}>Instacrack</h1>
          <p
            style={{
              color: "#8E8E8E",
              fontSize: "18px",
            }}
          >
            Regístrate para ver fotos y videos de tus amigos.
          </p>
        </div>

        <Form.Item
          wrapperCol={{
            offset: 0,
            span: 0,
          }}
        >
          <Button
            onClick={handleGoogleSignin}
            style={{
              width: "100%",
              fontWeight: "bold",
            }}
            type="primary"
            htmlType="submit"
          >
            Iniciar sesión con Google
          </Button>
        </Form.Item>
        <hr />

        <Form
          onSubmit={handleSubmit}
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
          <p className="text-danger">{error}</p>
          <Input
            type="email"
            className="mb-2"
            size="large"
            placeholder="Ingresa tu correo"
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            name="email"
          ></Input>
          <Input
            type="text"
            className="mb-2"
            size="large"
            placeholder="Ingresa tu username"
            onChange={(e) => setUser({ ...user, username: e.target.value })}
            name="username"
          ></Input>
          <Input
            type="text"
            className="mb-2"
            size="large"
            placeholder="Ingresa tu fullname"
            onChange={(e) => setUser({ ...user, fullname: e.target.value })}
            name="fullname"
          ></Input>
          <Input.Password
            type="password"
            className="mb-2"
            size="large"
            name="password"
            placeholder="Ingresa tu contraseña"
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
          <Button
            style={{
              width: "100%",
            }}
            type="primary"
            htmlType="submit"
          >
            Registrate
          </Button>
          <p
            style={{
              color: "#8E8E8E",
              fontSize: "13px",
            }}
          >
            Al registrarte, aceptas nuestras Condiciones, la Política de datos y
            la Política de cookies.
          </p>
        </Form>
      </div>
      <div
        style={{
          width: "400px",
          margin: "0px auto",
          background: "#FFFFFF",
          display: "flex",
          justifyContent: "center",
          textAlign: "center",
          padding: "15px 20px",
          border: "1px solid #DDDDDD",
          marginBottom: "30px",
        }}
      >
        <p
          style={{
            margin: 0,
            padding: 0,
          }}
        >
          ¿Tienes una cuenta?
        </p>
        &nbsp;
        <Link
          to="/"
          style={{
            fontWeight: "bold",
            color: "#00A2F8",
          }}
        >
          Inicia sesión
        </Link>
      </div>
    </div>
  )
}

export default Register
