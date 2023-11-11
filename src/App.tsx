import React, { useState } from "react";
import { useEffect } from "react";

import Bottone from "./components/Bottone";
import HelpingPage from "./components/HelpingPage";
import ChargingPage from "./components/ChargingPage";
// import OtherComponent from "./components/OtherComponent"; // import other components
import "./App.css";
import ParkingAbusePage from "./components/ParkingAbusePage";

type ParkingAbuseState = "thermal" | "not-plugged-in" | "none";
export type ChargingState = "charging" | "not-charging" | "paused";

export default function App() {
  const [componentToShow, setComponentToShow] = useState("Bottone");
  const [carAuthorized, setCarAuthorized] = useState(false);
  const [paymentAuthorized, setPaymentAuthorized] = useState(false);
  const [charging, setCharging] = useState<ChargingState>("not-charging");
  const [parkingAbuse, setParkingAbuse] = useState<ParkingAbuseState>("none");

  const showBottone = () => setComponentToShow("Bottone");
  const showOtherComponent = () => setComponentToShow("OtherComponent");

  //Event listener for the "A" key, to authorize the car
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === "A" || event.key === "a") {
        setCarAuthorized((prevCarAuthorized) => !prevCarAuthorized); // Toggle carAuthorized
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    // Cleanup function to remove the event listener
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);
  //EventListener for the "P" key, to authorize the payment
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === "P" || event.key === "p") {
        setPaymentAuthorized((prevPaymentAuthorized) => !prevPaymentAuthorized); // Toggle paymentAuthorized
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    // Cleanup function to remove the event listener
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  //EventListener for the "B", to signal a parking abuse
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === "B" || event.key === "b") {
        setParkingAbuse("thermal");
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    // Cleanup function to remove the event listener
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  //EventListener for the "R" key to reset state
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === "R" || event.key === "r") {
        setCarAuthorized(false);
        setPaymentAuthorized(false);
        setCharging("not-charging");
        setParkingAbuse("none");
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    // Cleanup function to remove the event listener
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  useEffect(() => {
    parkingAbuse === "thermal" || parkingAbuse === "not-plugged-in"
      ? setCarAuthorized(false)
      : setCarAuthorized(true);
  }, [parkingAbuse]);

  useEffect(() => {
    if (carAuthorized === true) {
      setParkingAbuse("none");
    }
  }, [carAuthorized]);

  function onTogglePause() {
    charging === "paused" ? setCharging("charging") : setCharging("paused");
  }

  function onStopCharging() {
    setCharging("not-charging");
  }

  return (
    <>
      <div
        style={
          {
            // display: "flex",
            // flexDirection: "column",
            // justifyContent: "center",
            // alignItems: "center",
            // height: "100vh",
          }
        }
      >
        Wecolme to ChargeWare
        {(charging === "charging" || charging === "paused") &&
          paymentAuthorized === true && (
            <ChargingPage
              onTogglePause={onTogglePause}
              onStopCharging={onStopCharging}
              charging={charging}
            ></ChargingPage>
          )}
        {parkingAbuse !== "none" && <ParkingAbusePage />}
        {carAuthorized === true && paymentAuthorized === false && (
          <p>Insert credit card</p>
        )}
        {carAuthorized === true &&
          paymentAuthorized === true &&
          charging === "not-charging" && (
            <Bottone
              text="Inizia ricarica"
              onClick={() => setCharging("charging")}
            />
          )}
      </div>
    </>
  );
}
