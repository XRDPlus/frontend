import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppContent from "./components/AppContent";
import DashboardContent from "./components/DashboardContent";

function App() {
  const timeToStartCharging = 5 * 60 * 1000; // 5 minuti
  const timeToCompleteCharging = 60 * 60 * 1000; // 1 ora

  return (
    <Router>
      <Routes>
        <Route path="/" element={<AppContent />} />
        <Route path="/dashboard" element={<DashboardContent />} />
      </Routes>
    </Router>
  );

  // return
  // );
}

export default App;
