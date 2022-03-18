import { NavLink } from "react-router-dom"

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div className="container-fluid">
        <NavLink to="/" className="navbar-brand px-3">
          Login
        </NavLink>

        <NavLink
          to="/home"
          activeClassName="active"
          className="btn btn-light fw-bold rounded-pill m-2"
        >
          Home
        </NavLink>

        <NavLink
          to="/register"
          activeClassName="active"
          className="btn btn-light fw-bold rounded-pill m-2"
        >
          Register
        </NavLink>
      </div>
    </nav>
  )
}

export default Navbar
