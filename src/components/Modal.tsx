import React from "react";

type TModalProps = {
  children: React.ReactNode;
  show: boolean
}

export function Modal({children, show}: TModalProps) {
  return (
    <div className={`modal_overlay ${show ? 'is_shown' : ''}`}>
      <div className="modal_table">
        <div className="modal_cell">
          {children}
        </div>
      </div>
    </div>
  )
}