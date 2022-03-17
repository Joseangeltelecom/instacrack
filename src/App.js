import logo from "./logo.svg"
import "./App.css"
import { Route, Routes } from "react-router-dom"
import Login from "./pages/Login"
import Home from "./pages/Home"
import Register from "./pages/Register"
import Navbar from "./pages/Navbar"

function App() {
  return (
    <div className="App">
      <Navbar />
      <br />
      <br />
      <br />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  )
}

export default App
