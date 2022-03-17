import logo from "./logo.svg"
import "./App.css"
import { Route, Routes } from "react-router-dom"
import Login from "./pages/Login"
import Home from "./pages/Home"
import Register from "./pages/Register"

function App() {
  return (
    <div className="App">
      <h1>NO ESTOY EN EL ROUTER</h1>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  )
}

export default App
