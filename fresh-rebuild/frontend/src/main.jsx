import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { DetailPage } from "./pages/DetailPage";
import { AddAnimePage } from "./pages/AddAnimePage";
import { CollectionPage } from "./pages/CollectionPage";
import "./styles/index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/anime/:id" element={<DetailPage />} />
        <Route path="/add" element={<AddAnimePage />} />
        <Route path="/collection" element={<CollectionPage />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
