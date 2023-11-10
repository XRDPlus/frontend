import React from "react";
import Bottone from "./Bottone";
import { ChargingState } from "../App";
import ElapsedTime from "./ElapsedTime";

interface ChargingPageProps {
  onStopCharging: () => void;
  onTogglePause: () => void;
  charging: ChargingState;
}
const ChargingPage: React.FC<ChargingPageProps> = ({
  onTogglePause,
  onStopCharging,
  charging,
}) => {
  return (
    <>
      {charging === "charging" && <p>You are now charging</p>}
      {charging === "paused" && <p>You have paused the charging</p>}
      <Bottone text="Stop charging" onClick={onStopCharging} disabled={false} />
      <Bottone
        text={charging === "charging" ? "Pause charging" : "Resume charging"}
        onClick={onTogglePause}
        disabled={false}
      />
      <ElapsedTime charging={charging} />
    </>
  );
};

export default ChargingPage;
