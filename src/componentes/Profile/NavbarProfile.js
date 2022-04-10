import { FolderOutlined, TableOutlined } from "@ant-design/icons";
import React from "react";
import { NavLink } from "react-router-dom";
import "../../styles/navbarprofile.css";

export const NavbarProfile = () => {
  return (
    <>
      <div
        className="row justify-content-center"
        style={{ fontSize: "14px", padding: "10px 0" }}
      >
        <div
          className="col-2"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TableOutlined style={{ color: "gray" }} />
          <NavLink to="/profile" className="navlink">
            PUBLICACIONES
          </NavLink>
        </div>
        <div
          className="col-2"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <FolderOutlined />
          <NavLink to="/postsaved" className="navlink">
            GUARDADO
          </NavLink>
        </div>
      </div>
    </>
  );
};
