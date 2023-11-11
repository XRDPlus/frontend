import { useState, useEffect } from "react";
import Sidebar from "./DashboardSidebar";

interface ChargingData {
  id: number;
  stationName: string;
  timestamp: string;
  kWhDelivered: number;
  payment: number;
}
function handleClickTutte = () => {
    setSelectedView("tutte");
};
handleClickOverview = () => {
    setSelectedView("overview");
};
handleClickLorem = () => {
    setSelectedView("lorem");
};
const DashboardContent = () => {
  const [selectedView, setSelectedView] = useState<
    "tutte" | "overview" | "lorem"
  >("tutte");
  return (
    <>
      <Sidebar />
      {selectedView === "tutte" && <div>View tutte</div>}
      {selectedView === "overview" && <div>View overview</div>}
      {selectedView === "lorem" && <div>View lorem</div>}
    </>
  );
};

export default DashboardContent;
