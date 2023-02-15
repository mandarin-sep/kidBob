import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import { store } from "./store/store";
import "./index.css";
import { NavermapsProvider } from "react-naver-maps";

const NAVER_KEY = import.meta.env.VITE_NAVER_KEY;

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <NavermapsProvider ncpClientId={NAVER_KEY}>
        <App />
      </NavermapsProvider>
    </Provider>
  </React.StrictMode>
);
