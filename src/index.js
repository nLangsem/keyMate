import React from "react";
import { createRoot } from "react-dom/client"; // Import createRoot from the correct path
import App from "./components/App.js";
import "bootstrap/dist/css/bootstrap.min.css";

const rootElement = document.getElementById("root");

// Use createRoot from react-dom/client
createRoot(rootElement).render(<App />);
