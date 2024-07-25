import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {Preloader} from "./Preloader";
import {ContentService} from "../services/content.service";
import logo from "../img/main_logo.svg";
import phoneImg from "../img/phone.svg";
import controlImg2 from "../img/header_control2.svg";
import {Search} from "./Search";
import {RootState} from "../redux/store";
import {useSelector} from "react-redux";

interface IHeader {
  logoLink: string;
  navList: string[][];
  headerPhone: string[];
}

export function Header() {
  const cartItems = useSelector((state: RootState) => state.cart.cartItems);
  
  const [sectionData, setSectionData] = useState<IHeader | undefined>();
  const [spinner, setSpinner] = useState(true);
  
  useEffect(() => {
    const fetchData = async () => {
      const data = await ContentService.getHeader()
      setSectionData(data)
      setSpinner(false)
    }
    fetchData()
  }, []);
  
  let spinnerClass = 'header_preloader';
  if (spinner || !sectionData) {
    return <Preloader customClass={spinnerClass}/>
  }
  let {navList, headerPhone} = sectionData;
  
  return (
    <header className="header">
      <div className="header_cols">
        <div className="main_logo">
          <Link to="/">
            <img src={logo} alt="logo"/>
          </Link>
        </div>
        <div className="header_middle" id="nav_list">
          <ul className="nav_list">
            {
              navList.map((link, index: number) =>
                <li key={index}><Link to={link[0]}>{link[1]}</Link></li>)
            }
          </ul>
        </div>
        <div className="header_right">
          <a className="header_phone" href={headerPhone[0]}><span
            className="header_phone_ico"><img className="svg" src={phoneImg} alt="ico"/></span><span
            className="header_phone_txt">{headerPhone[1]}</span></a>
          
          <ul className="header_controls">
            <li className="head_search_li">
              <Search/>
            </li>
            <li>
              <Link className="header_control" to="/cart">
                <img src={controlImg2} alt="ico"/>
                <span className="header_control_count">{cartItems.length}</span>
              </Link>
            </li>
          </ul>
          <a className="header_links_trigger header_links_trigger__js" href="#nav_list">
            <span/>
            <span className="transparent"/>
            <span/>
          </a>
        </div>
      </div>
    </header>
  )
}
