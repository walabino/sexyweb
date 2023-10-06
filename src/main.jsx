import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

import { DarkModeContextProvider } from "./context/darkMode.jsx";
import { AuthContextProvider } from "./context/authContext.jsx";
import "./global.scss";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <DarkModeContextProvider>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </DarkModeContextProvider>
  </React.StrictMode>
);
