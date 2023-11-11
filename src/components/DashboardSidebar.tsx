// Sidebar.tsx
import React from "react";
import "./css/DashboardSidebar.css";
import { PossibleScreens } from "./DashboardContent";
import SidebarButtons from "./SidebarButtons";

interface SidebarProps {
  handleSidebar: (button: PossibleScreens) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ handleSidebar }) => {
  return (
    <div className="sidebar">
      <img
        className="Sidebar-logo"
        src="https://i.imgur.com/gAkqQP7.png"
        alt="loading"
      />
      <SidebarButtons
        buttons={[
          ["Tutte le ricariche", "tutte"],
          ["Overview", "overview"],
          ["Targhe", "targhe"],
          ["Profili", "profili"],
        ]}
        handleSidebar={handleSidebar}
      />
    </div>
  );
};

export default Sidebar;
