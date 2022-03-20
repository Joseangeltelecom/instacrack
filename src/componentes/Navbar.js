import { Button } from "antd"
import React from "react"
import { useAuth } from "../context/AuthContext"

function Navbar() {
  const { logout, user } = useAuth()

  console.log(user)
  const handleLogout = async () => {
    try {
      await logout()
    } catch (error) {
      console.error(error.message)
    }
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div className="container-fluid">
        <Button
          onClick={handleLogout}
          className="btn btn-light fw-bold rounded-pill m-2"
          hidden={user ? false : false}
        >
          Log out
        </Button>
      </div>
    </nav>
  )
}

export default Navbar
