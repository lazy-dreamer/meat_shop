import React from "react";

export function Modal({children, show}) {
  return(
    <div className={`modal_overlay ${show? 'is_shown': ''}`}>
      <div className="modal_table">
        <div className="modal_cell">
          {children}
        </div>
      </div>
    </div>
  )
}