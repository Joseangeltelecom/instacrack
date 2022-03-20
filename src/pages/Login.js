import React from "react"
import { Form, Input, Button } from "antd"
import { Link, useNavigate } from "react-router-dom"

function Login() {
  let navigate = useNavigate()
  const onFinish = (values) => {
    console.log("Success:", values)
    navigate("/home")
  }

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo)
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
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your username!",
                placeholder: "hola",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 0,
              span: 0,
            }}
          >
            <Button
              style={{
                width: "100%",
              }}
              type="primary"
              htmlType="submit"
            >
              Iniciar sesión
            </Button>
          </Form.Item>
          <hr />
          <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{
              offset: 0,
              span: 0,
            }}
          >
            <div
              style={{
                marginBottom: "15px",
                color: "#385189",
                fontWeight: "bold",
              }}
            >
              Iniciar Sesión con Google
            </div>
            <div>¿Olvidaste tu Contraseña?</div>
          </Form.Item>
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
          Inicia sesión
        </Link>
      </div>
    </div>
  )
}

export default Login
