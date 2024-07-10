import React, {useRef, useEffect, useState} from "react";

export function ProductFilter({filter}) {
  const [filterVisibility, setFilterVisibility] = useState(false);
  const wrapperRef = useRef(null);

  function useOutsideAlerter(ref) {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          //clicked outside
          setFilterVisibility(false)
        }
      }
      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }
  
  useOutsideAlerter(wrapperRef);
  
  return (
    <div className="product_filter" ref={wrapperRef}>
      <button className="product_filter__js product_filter_title" type="button" onClick={()=>setFilterVisibility(prev=> !prev)}>{filter.filterName}</button>
      <div className={`product_filters_dropdown ${filterVisibility? 'is_shown' : ''}`}>
        <div className="ch_blocks">
          {
            filter.filterVariants.map((variant, index) => <label key={index} className="ch_block">
              <input type="checkbox" className="filter_checkbox" name="filter_checkbox" value={variant[1]} />
              <div className="ch_block_icon squered" />
              <span>{variant[0]}</span>
            </label>)
          }
        </div>
        <button className="more_btn" type="submit"><span className="more_btn_text with_line">ПРИМЕНИТЬ</span></button>
      </div>
    </div>
  )
}