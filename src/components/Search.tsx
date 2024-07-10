import React, {useContext, useEffect, useState} from "react";
import {Link} from "react-router-dom";
import controlImg1 from "../img/header_control1.svg";
import {CartContext} from "../providers/CartProvider";

export function Search() {
  const [searchVisibility, setSearchVisibility] = useState(false),
    [searchProducts, setSearchProducts] = useState([]),
    [searchInputValue, setSearchInputValue] = useState(''),
    [searchedProducts, setSearchedProducts] = useState([]);

  const { products } = useContext(CartContext);

  useEffect(() => {
    let searchArr = []
    for (let i in products) {
      searchArr.push([products[i].id, products[i].name, products[i].productImage])
    }
    setSearchProducts(searchArr)
  }, []);
  function searchFocus() {
    setSearchVisibility(true)
  }
  function searchBlur(e) {
    if (e.target.value.length < 1) {
      setSearchVisibility(false)
      setSearchedProducts([])
    } 
  }
  function changeSearch(e) {
    setSearchInputValue(e.target.value)
  }
  function searchKeyUp() {
    let searchStr = searchInputValue.toLowerCase(),
      tempArr = [];
    if (searchStr.length<2) {
      setSearchedProducts([])
    } else {
      for (let i in searchProducts) {
        if (searchProducts[i][1].toLowerCase().includes(searchStr)) {
          tempArr.push(searchProducts[i])
        }
      }
      setSearchedProducts(tempArr)
    }
  }
  function searchRefresh() {
    setSearchedProducts([])
    setSearchVisibility(false)
    setSearchInputValue('')
  }
  
  return (
    <form className="head_search header_control" action="">
      <div className="head_search_block">
        <input className={`focus_field__element search_input ${searchVisibility?' focused': ''}`} type="text" name="" placeholder="Поиск..." onFocus={searchFocus} onBlur={searchBlur} onKeyUp={searchKeyUp} onChange={changeSearch} value={searchInputValue} />
        <button className="search_btn header_control" type="submit">
          <img src={controlImg1} alt="ico"/>
        </button>
        {
          searchedProducts.length<1? '' : <div className="output_frame">
            <div className="search_output_blocks">
              {
                searchedProducts.map((prod, index) => <Link key={index} to={`/product/${prod[0]}`} className="search_output_block" onClick={searchRefresh}>
                  <span className="search_output_ico" style={{background: `url(../${prod[2]}) center/cover no-repeat`}} />
                  {/*background: url(img/product1.jpg) center/cover no-repeat;*/}
                  <span className="search_output_title">{prod[1]}</span>
                </Link>)
              }
            </div>
          </div>
        }
        
      </div>
    </form>
  )
}