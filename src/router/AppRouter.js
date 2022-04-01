import React from "react"
import { Route, Routes } from "react-router-dom"
import { PostSaved } from "../pages/PostSaved"
import Chat from "../pages/Chat"
import Home from "../pages/Home"
import Login from "../pages/Login"
import { Profile } from "../pages/Profile"
import Register from "../pages/Register"
import ResetPassword from "../pages/ResetPassword"

import PublicRoute from "./PublicRoute"
import ProtectedRoute from "./ProtectedRoute"
import { useAuth } from "../context/AuthContext"
import { ProfileOthers } from "../componentes/profileOhers/ProfileOthers"
import { ChatByPerson } from "../pages/ChatByPerson"

export const AppRouter = () => {
  const { user } = useAuth()
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
      <Route path="/reset" element={<ResetPassword />} />
      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      )
      <Route path="/postsaved" element={<PostSaved />} />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile/:username"
        element={
          <ProtectedRoute>
            <ProfileOthers />
          </ProtectedRoute>
        }
      />
      <Route
        path="/chat"
        element={
          <ProtectedRoute>
            <Chat />
          </ProtectedRoute>
        }
      />
      <Route
        path="/chat/:username"
        element={
          <ProtectedRoute>
            <ChatByPerson />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<div>Eror 404 resource not found</div>} />
    </Routes>
  )
}
