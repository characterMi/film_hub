import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import App from "./App";
import { Provider } from "react-redux";
import store from "./app/store";

import "./index.css";
import ThemeProviderComponent from "./themes/ThemeProviderComponent";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <ThemeProviderComponent>
      <HashRouter>
        <App />
      </HashRouter>
    </ThemeProviderComponent>
  </Provider>
);
