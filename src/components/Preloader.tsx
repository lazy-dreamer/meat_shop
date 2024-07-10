import React from "react";

export function Preloader({customClass}) {
  if (customClass == undefined) {
    customClass = ''
  }
  return(
    <div className={ `preloader_wrapper ` + customClass}>
      <div className="lds-dual-ring"></div>
    </div>
  )
}