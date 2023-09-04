import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { ArticlesContextProvider } from "./context/ArticlesContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ArticlesContextProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </ArticlesContextProvider>
  </BrowserRouter>
);
