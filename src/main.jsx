import React from "react";
import ReactDOM from "react-dom/client";
import "./scss/main.css";
import "./components/Characters";
import App from "./components/App";
import { BrowserRouter, Routes } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </React.StrictMode>
);
