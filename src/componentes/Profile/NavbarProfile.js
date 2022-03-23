import React from "react";
import { NavLink } from "react-router-dom";
import "../../styles/navbarprofile.css";

export const NavbarProfile = () => {
  return (
    <>
      <div
        class="row justify-content-center"
        style={{ fontSize: "14px", padding: "10px 0" }}
      >
        <div
          class="col-2"
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <NavLink to="/profile" activeClassName="selected" className="navlink">
            PUBLICACIONES
          </NavLink>
        </div>
        <div
          class="col-2"
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <NavLink
            to="/postsaved"
            activeClassName="selected"
            className="navlink"
          >
            GUARDADO
          </NavLink>
        </div>
      </div>
    </>
  );
};
