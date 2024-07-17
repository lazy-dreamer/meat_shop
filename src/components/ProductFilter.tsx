import React, {useRef, useEffect, useState} from "react";
import {ICategoryFilter} from "./CategorySection";

interface IFilterBlock {
  filter: ICategoryFilter
}

export const ProductFilter: React.FC<IFilterBlock> = ({filter}) => {
  const [filterVisibility, setFilterVisibility] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  
  function useOutsideAlerter(ref: React.RefObject<HTMLDivElement>) {
    useEffect(() => {
      function handleClickOutside(event: MouseEvent): void {
        if (ref.current && !ref.current.contains(event.target as Node)) {
          setFilterVisibility(false)
        }
      }
      
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }
  
  useOutsideAlerter(wrapperRef);
  
  return (
    <div className="product_filter" ref={wrapperRef}>
      <button className="product_filter__js product_filter_title" type="button"
              onClick={() => setFilterVisibility(prev => !prev)}>{filter.filterName}</button>
      <div className={`product_filters_dropdown ${filterVisibility ? 'is_shown' : ''}`}>
        <div className="ch_blocks">
          {
            filter.filterVariants.map((variant, index) => <label key={index} className="ch_block">
              <input type="checkbox" className="filter_checkbox" name="filter_checkbox" value={variant[1]}/>
              <div className="ch_block_icon squered"/>
              <span>{variant[0]}</span>
            </label>)
          }
        </div>
        <button className="more_btn" type="submit"><span className="more_btn_text with_line">ПРИМЕНИТЬ</span></button>
      </div>
    </div>
  )
}