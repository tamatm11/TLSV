/** @format */

import React from "react";
import ReactDOM from "react-dom/client";
import App from "@/App";
import "@/index.css";
import { HelmetProvider } from "react-helmet-async"; // Import mới

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HelmetProvider>
      {" "}
      {/* Thêm Provider */}
      <App />
    </HelmetProvider>
  </React.StrictMode>
);
