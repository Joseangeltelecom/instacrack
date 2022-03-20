import React, { useState } from "react"
import { Form, Input, Button } from "antd"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

import { LockOutlined, UserOutlined } from "@ant-design/icons"

function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  })
  const { login, loginWithGoogle, resetPassword } = useAuth()
  const [error, setError] = useState("")
  let navigate = useNavigate()

  const handleSubmit = async (e) => {
    setError("")
    try {
      await login(user.email, user.password)
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
      navigate("/home")
    } catch (error) {
      setError(error.message)
    }
  }

  const onFinishFailed = (errorInfo) => {
    setError(errorInfo)
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        textAlign: "center",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          width: "400px",
          margin: "100px auto 10px",
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
            margin: "30px 0px",
          }}
        >
          <h1 style={{ fontFamily: "Lobster" }}>Instacrack</h1>
        </div>

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
          <Link to="/reset">¿Olvidaste tu Contraseña?</Link>
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
        }}
      >
        <p
          style={{
            margin: 0,
            padding: 0,
          }}
        >
          ¿No tienes una cuenta?
        </p>
        &nbsp;
        <Link
          to="/register"
          style={{
            fontWeight: "bold",
            color: "#00A2F8",
          }}
        >
          Regístrate
        </Link>
      </div>
    </div>
  )
}

export default Login
