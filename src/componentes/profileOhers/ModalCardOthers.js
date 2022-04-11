import React from "react";
import "../../styles/modalcard.css";

export const ModalCardOthers = ({ children, estado }) => {
  return (
    <>
      {estado && (
        <div className="overley">
          <div className="contenedor-modal">{children}</div>
        </div>
      )}
    </>
  );
};
