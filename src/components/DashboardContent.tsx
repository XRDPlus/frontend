// DashboardContent.tsx
import React from "react";
import Sidebar from "./DashboardSidebar";
import ContentView from "./ContentView";
import "./css/Dashboard.css";

export type PossibleScreens =
  | "tutte"
  | "overview"
  | "targhe"
  | "profili"
  | "lorem";

const DashboardContent = () => {
  const [selectedView, setSelectedView] =
    React.useState<PossibleScreens>("tutte");

  const handleClickedButton = (button: PossibleScreens) => {
    setSelectedView(button);
  };

  return (
    <div className="dashboarder">
      <Sidebar handleSidebar={handleClickedButton} />
      <ContentView selectedView={selectedView} />
    </div>
  );
};

export default DashboardContent;
