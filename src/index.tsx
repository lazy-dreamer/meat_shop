import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './fix.scss';
import App from './components/App';
import {BrowserRouter} from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import {store} from './redux/store';
import {Provider} from "react-redux";

let root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <BrowserRouter>
    <ScrollToTop/>
    <Provider store={store}>
      <App/>
    </Provider>
  </BrowserRouter>
);
