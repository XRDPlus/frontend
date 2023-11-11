import React from "react";

interface OverviewProps {
  earnings: number;
  stations: number;
  chargingSessions: number;
}

const Overview: React.FC<OverviewProps> = ({
  earnings,
  stations,
  chargingSessions,
}) => {
  return (
    <div>
      <h2>Overview</h2>
      <p>Total earnings: ${earnings}</p>
      <p>Number of stations: {stations}</p>
      <p>Number of charging sessions: {chargingSessions}</p>
    </div>
  );
};

export default Overview;
