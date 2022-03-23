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

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/reset" element={<ResetPassword />} />
      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route path="/profile" element={<Profile />} />
      <Route path="/postsaved" element={<PostSaved />} />
      <Route path="/chat" element={<Chat />} />
    </Routes>
  );
};
