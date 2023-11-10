import React, { useState, useEffect } from "react";
import { ChargingState } from "../App";

interface ElapsedTimeProps {
  charging: ChargingState;
}

const ElapsedTime: React.FC<ElapsedTimeProps> = ({ charging }) => {
  const [elapsedTime, setElapsedTime] = useState<number>(0);

  useEffect(() => {
    if (charging === "charging") {
      const interval = setInterval(() => {
        setElapsedTime((prevElapsedTime) => prevElapsedTime + 1);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [charging]);

  return <div>Elapsed time: {elapsedTime} seconds</div>;
};

export default ElapsedTime;
