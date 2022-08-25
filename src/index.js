
import React from 'react';
import ReactDOM from 'react-dom/client';
import { applyMiddleware, createStore } from 'redux';
import logger from 'redux-logger'
import { Provider } from "react-redux";

import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import allReducers from './redux/reducers/index';

const store = createStore(allReducers, applyMiddleware(logger));
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
reportWebVitals();
