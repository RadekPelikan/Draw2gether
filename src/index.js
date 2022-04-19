import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { SocketContext, socket } from "./Context/socket";
import App from "./App";
import "./scss/style.css";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <BrowserRouter>
    <SocketContext.Provider value={socket}>
      <App tab="home" />
    </SocketContext.Provider>
  </BrowserRouter>
);

/*
import React from "react";
import { Provider } from "react-redux";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import * as serviceWorker from "./serviceWorker";

import { store } from "Redux/store";
import {SocketContext, socket} from 'Context/socket';
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <SocketContext.Provider value={socket}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </SocketContext.Provider>
    </Provider>
  </React.StrictMode>
);

serviceWorker.unregister();
*/
