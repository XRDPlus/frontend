// SidebarButtons.tsx
import React from "react";
import { PossibleScreens } from "./DashboardContent";

interface SidebarButtonsProps {
  buttons: Array<[string, PossibleScreens]>;
  handleSidebar: (button: PossibleScreens) => void;
}

const SidebarButtons: React.FC<SidebarButtonsProps> = ({
  buttons,
  handleSidebar,
}) => {
  return (
    <>
      {buttons.map(([text, value]) => (
        <button
          key={value}
          className="sidebar-button"
          onClick={() => handleSidebar(value)}
        >
          {text}
        </button>
      ))}
    </>
  );
};

export default SidebarButtons;
