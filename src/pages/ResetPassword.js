import React, { useState } from "react"
import { Form, Input, Button } from "antd"
import { useAuth } from "../context/AuthContext"
import { Link } from "react-router-dom"

function ResetPassword() {
  const [email, setEmail] = useState("")
  const [success, setSuccess] = useState("")
  const { resetPassword } = useAuth()
  const [error, setError] = useState("")

  const onFinishFailed = (errorInfo) => {
    console.log(errorInfo)
    // if (!email) return setError("Write an email to reset password")
    // if (errorInfo === "Firebase: Error (auth/invalid-email).")
    //   setError("That email doesn't exit, Please enter a registered email")
    // setError(errorInfo)
    console.log(errorInfo)
  }

  const handleResetPassword = async (e) => {
    if (!email) return setError("Write an email to reset password")
    try {
      await resetPassword(email)
      setSuccess("We sent you an email. Check your inbox")
      setEmail("")
    } catch (error) {
      console.log(error)
      if (error.message === "auth/invalid-email") {
        setError("That email doesn't exit, Please enter a registered email")
      }

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
            margin: "30px 0px 0px",
          }}
        >
          <h1 style={{ fontFamily: "Lobster" }}>Instacrack</h1>
        </div>

        <p className="text-danger">{error}</p>
        <p className="text-success">{success}</p>

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
          onFinish={handleResetPassword}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Input
            className="mb-2"
            size="large"
            placeholder="Ingresa un correo registrado"
            onChange={(e) => setEmail(e.target.value)}
            name="email"
            value={email}
          ></Input>

          <Button
            style={{
              width: "100%",
              marginBottom: "10px",
            }}
            type="primary"
            htmlType="submit"
          >
            Enviar correo
          </Button>
        </Form>
        <div>
          <Link to="">Volver al inicio de sesión</Link>
        </div>
      </div>
    </div>
  )
}

export default ResetPassword
