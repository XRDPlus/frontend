// ChargingTimer.tsx

import React, { useEffect, useState } from "react";

interface ChargingTimerProps {
  handlePauseCharging: () => void;
  handleStopCharging: () => void;
  chargingCounter: number;
  isChargingPaused: boolean;
}

const ChargingTimer: React.FC<ChargingTimerProps> = ({
  handlePauseCharging,
  handleStopCharging,
  isChargingPaused,
}) => {
  const [chargingCounter, setChargingCounter] = useState(0);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (!isChargingPaused) {
      timer = setInterval(() => {
        setChargingCounter((prevCounter) => prevCounter + 1);
      }, 1000);
    }
    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [isChargingPaused]);

  return (
    <>
      <div className="bottoni">
        <button className="PauseChargingButton" onClick={handlePauseCharging}>
          {isChargingPaused ? "Resume Charging" : "Pause Charging"}
        </button>
        <button className="StopChargingButton" onClick={handleStopCharging}>
          Stop Charging
        </button>
      </div>
      <p>Charging Time: {chargingCounter} seconds</p>
    </>
  );
};

export default ChargingTimer;
