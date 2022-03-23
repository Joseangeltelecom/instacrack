import React from "react";

export const HeaderProfile = () => {
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
          src="https://elcomercio.pe/resizer/1AdR3_S-R4ZELHQ6WkNRGhkZhdc=/1200x900/smart/filters:format(jpeg):quality(75)/cloudfront-us-east-1.images.arcpublishing.com/elcomercio/BH5EJQD2ZZF5XGJM2AHNJW7HUI.jpg"
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
        <h2 style={{ fontWeight: "lighter" }}>tupapitengen</h2>
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
          <b>Tengen Uzui</b>
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
