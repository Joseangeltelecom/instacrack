import React from "react";
import { Route, Routes } from "react-router-dom";
import { PostSaved } from "../pages/PostSaved";
import Chat from "../pages/Chat";
import Home from "../pages/Home";
import Login from "../pages/Login";
import { Profile } from "../pages/Profile";
import Register from "../pages/Register";
import ResetPassword from "../pages/ResetPassword";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";
import { useAuth } from "../context/AuthContext";

export const AppRouter = () => {
  const { user } = useAuth();

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
        path="/chat"
        element={
          // <PublicRoute>
          <Chat />
          // </PublicRoute>
        }
      />
      <Route path="*" element={<div>Eror 404 resource not found</div>} />
    </Routes>
  );
};
