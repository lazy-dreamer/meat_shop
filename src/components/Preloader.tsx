import React from "react";

interface IPreloader {
  customClass: string
}

export const Preloader: React.FC<IPreloader> = ({customClass}) => {
  if (customClass == undefined) {
    customClass = ''
  }
  return (
    <div className={`preloader_wrapper ` + customClass}>
      <div className="lds-dual-ring"/>
    </div>
  )
}