import { Navigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import React from "react"
import { Spin } from "antd"
export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth()

  const style = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  }

  if (loading)
    return (
      <div style={style}>
        <Spin color={"#123abc"} size="large" />
      </div>
    )

  if (!user) return <Navigate to="/" />

  return <>{children}</>
}
