import React from "react";
import { useParams } from "react-router-dom";

export const HeaderProfileOthers = (props) => {
  const { username } = useParams();

  return (
    <div className="row justify-content-center" style={{ width: "100vw" }}>
      <div
        className="col-2"
        style={{
          borderBottom: "2px solid rgba(0, 0, 0, 0.2)",
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
        }}
      >
        <img
          src={props.imgProfile}
          style={{
            width: "155px",
            height: "155px",
            borderRadius: "50%",
          }}
        />
      </div>

      <div
        className="col-6"
        style={{ borderBottom: "2px solid rgba(0, 0, 0, 0.2)" }}
      >
        <h2 style={{ fontWeight: "lighter" }}>{username}</h2>
        <div className="row" style={{ fontSize: "16px" }}>
          <div className="col-3">
            <b>{props.filteredPosts.length}</b>{" "}
            {props.filteredPosts.length == 1 ? "publicación" : "publicaciones"}
          </div>
          <div className="col-3">
            <b>10 </b> seguidores
          </div>
          <div className="col-3">
            <b>10 </b> seguidos
          </div>
        </div>
        <p style={{ marginTop: "15px", fontSize: "16px" }}>
          <b>{props.fullname}</b>
        </p>
        <div style={{ fontSize: "16px" }}>
          <p>
            -Cazador de Demonios.
            <br /> -Fisicoculturista.
          </p>
        </div>
      </div>
    </div>
  );
};
