import React from "react"
import { useParams } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"


export const HeaderProfileOthers = (props) => {
  const { username } = useParams()
  const { user } = useAuth()

  console.log("props", props.imgProfile)

  return (
    <div class="row justify-content-center" style={{ width: "100vw" }}>
      <div
        class="col-2"
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
        class="col-6"
        style={{ borderBottom: "2px solid rgba(0, 0, 0, 0.2)" }}
      >
        <h2 style={{ fontWeight: "lighter" }}>{username}</h2>
        <div class="row" style={{ fontSize: "16px" }}>
          <div class="col-3">
            <b>10 </b> publicaciones
          </div>
          <div class="col-3">
            <b>10 </b> seguidores
          </div>
          <div class="col-3">
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
  )
}
