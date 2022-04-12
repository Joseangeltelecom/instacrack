import React from 'react'
import '../../styles/modalcard.css'

export const ModalCardOthers = ({ children, estado, setIsVisible }) => {
  return (
    <>
      {estado && (
        <div
          className="overley"
          onClick={() => {
            setIsVisible(false)
          }}
        >
          <div className="contenedor-modal">{children}</div>
        </div>
      )}
    </>
  )
}
