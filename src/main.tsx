import * as React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import { AuthProvider } from "@/context/AuthContext";

import App from "./App";
import "./globals.css";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      {/* <QueryProvider> */}
        <AuthProvider>
          <App />
        </AuthProvider>
      {/* </QueryProvider> */}
    </BrowserRouter>
  </React.StrictMode>
);
