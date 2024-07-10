import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './fix.scss';
import App from './components/App';
import {BrowserRouter} from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";

let root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <BrowserRouter>
    <ScrollToTop/>
    <App/>
  </BrowserRouter>
);
