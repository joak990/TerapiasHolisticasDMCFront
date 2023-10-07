import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {Provider} from "react-redux";
import store from './Redux/Store.js';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    
  <React.StrictMode>
  <BrowserRouter>
  <PayPalScriptProvider options={{"clientId":"AZBheuzbAW06D7WCukD5mHMFNCpUKvAdynhWlLCK9Y4Q1WHDao9JhOHgEtYzCGVQO6SYiVaCdOaTz8Fe"}}>
    <App />
    </PayPalScriptProvider>
    </BrowserRouter>
  </React.StrictMode>,
  
  </Provider>
)
