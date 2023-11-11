// Sidebar.tsx
import React from "react";
import "./css/DashboardSidebar.css";

const Sidebar: React.FC = () => {
  return (
    <div className="sidebar">
      <img
        className="Sidebar-logo"
        src="https://i.imgur.com/gAkqQP7.png"
        alt="loading"
      />
      <button className="sidebar-button">Tutte le stazioni</button>
      <button className="sidebar-button">Overview</button>
      <button className="sidebar-button">Lorem ipsum</button>
    </div>
  );
};

export default Sidebar;
