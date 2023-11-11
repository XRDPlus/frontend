// ChargingTimer.tsx
import React from "react";

interface ChargingTimerProps {
  handlePauseCharging: () => void;
  handleStopCharging: () => void;
  chargingCounter: number;
}

const ChargingTimer: React.FC<ChargingTimerProps> = ({
  handlePauseCharging,
  handleStopCharging,
  chargingCounter,
}) => {
  return (
    <>
      <div className="bottoni">
        <button className="PauseChargingButton" onClick={handlePauseCharging}>
          Pause Charging
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
