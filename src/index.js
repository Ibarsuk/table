import React from "react";
import ReactDOM from "react-dom";

import {Provider} from "react-redux";

import store from './store/store';

import App from './components/app/app';

import './scss/general.scss';
import './scss/fonts.scss';

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.querySelector(`#root`)
);
