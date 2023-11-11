// ContentView.tsx
import React from "react";
import { PossibleScreens } from "./DashboardContent";
import Overview from "./Overview";

interface ContentViewProps {
  selectedView: PossibleScreens;
}

const ContentView: React.FC<ContentViewProps> = ({ selectedView }) => {
  return (
    <div className="content-view">
      {selectedView === "tutte" && <div>View tutte</div>}
      {selectedView === "overview" && (
        <Overview earnings={0} stations={0} chargingSessions={0} />
      )}
      {selectedView === "targhe" && <div>View targhe</div>}
      {selectedView === "profili" && <div>View profili</div>}
      {selectedView === "lorem" && <div>View lorem</div>}
    </div>
  );
};

export default ContentView;
