import React from 'react'
import ReactDOM from 'react-dom'

function Modal({ children, modalExitAnim, classes }) {

  return ReactDOM.createPortal(
    <div className={`${classes.modal_overlay} ${modalExitAnim && classes.fadeOut}`}>
        <div className={`${classes.modal_content} ${modalExitAnim ? classes.popAway : classes.popIn}`}>
          {children}
        </div>
    </div>,
    document.getElementById("portal")
  )
}

export default Modal