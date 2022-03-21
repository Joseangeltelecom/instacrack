import React from "react"
import { Route, Routes } from "react-router-dom"
import Chat from "../pages/Chat"
import Home from "../pages/Home"
import Login from "../pages/Login"
import { Profile } from "../pages/Profile"
import Register from "../pages/Register"
import ResetPassword from "../pages/ResetPassword"
import ProtectedRoute from "./ProtectedRoute"
import PublicRoute from "./PublicRoute"

export const AppRouter = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />
      <Route
        path="/register"
        element={
          <PublicRoute>
            <Register />
          </PublicRoute>
        }
      />
      <Route
        path="/reset"
        element={
          <PublicRoute>
            <ResetPassword />
          </PublicRoute>
        }
      />
      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <PublicRoute>
            <Profile />
          </PublicRoute>
        }
      />
      <Route
        path="/chat"
        element={
          <PublicRoute>
            <Chat />
          </PublicRoute>
        }
      />
      <Route path="*" element={<div>404 element not found</div>} />
    </Routes>
  )
}
