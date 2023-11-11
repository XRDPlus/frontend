import React, { useState, useEffect } from "react";
import "../App.css";
import axios from "axios";
import PlaceCardGroup from "./PlaceCardGroup";
import PoiSuggestor from "./PoiSuggestor";
import ParkingViolation from "./ParkingAbuse";
import ChargingTimer from "./ChargingTimer";

type Place = google.maps.places.PlaceResult;

// interface AppContentProps {
//   content: string;
// }

const AppContent: React.FC = () => {
  const [isEV, setIsEV] = useState(true);
  const [placesOfInterest, setPlacesOfInterest] = useState<Place[]>([]);
  const [chargingCounter, setChargingCounter] = useState<number>(0);
  const [chargingTimer, setChargingTimer] = useState<number | null>(null);
  const [chargingStarted, setChargingStarted] = useState<boolean>(false);
  const [awake, setAwake] = useState<boolean>(false);
  const [paymentAuthorized, setPaymentAuthorized] = useState<boolean>(false);
  const [chargingPaused, setChargingPaused] = useState<boolean>(false);

  // Simulazione di luoghi di interesse (sostituisci con la logica reale)
  const simulatedPlaces: Place[] = [
    {
      name: "Place 1",
      vicinity: "Address 1",
      rating: 4.5,
    },
    { name: "Place 2", vicinity: "Address 2", rating: 3.6 },
    // ... altri luoghi di interesse
  ];

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "A" || event.key === "a") {
        setAwake((prevAwake) => !prevAwake);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    // Cleanup function to remove the event listener when the component unmounts
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "t" || event.key === "T") {
        setIsEV((prevEV) => !prevEV);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    // Cleanup function to remove the event listener when the component unmounts
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "P" || event.key === "p") {
        setPaymentAuthorized((prevAuthorization) => !prevAuthorization);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    // Cleanup function to remove the event listener when the component unmounts
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:5000/valid/ZS908YJ")
      .then((response) => {
        setIsEV(response.data.isEV);
      })
      .catch((error) => {
        console.error("Error fetching data from the API:", error);
      });

    setPlacesOfInterest(simulatedPlaces);
  }, []);

  const handleStartCharging = () => {
    console.log("Charging started!");

    // Avvia un intervallo per aumentare il contatore ogni secondo
    const timer = window.setInterval(() => {
      setChargingCounter(
        (prevCounter) => prevCounter + (!chargingPaused ? 1 : 0)
      );
    }, 1000);

    // Aggiorna lo stato dell'intervallo e che la ricarica è iniziata
    setChargingTimer(timer);
    setChargingStarted(true);
  };

  const handlePauseCharging = () => {
    console.log("Charging paused!");
    setChargingPaused((prevPaused) => !prevPaused);

    // // Interrompi l'intervallo se è attivo
    // if (chargingTimer !== null) {
    //   window.clearInterval(chargingTimer);
    //   setChargingTimer(null);
    // }

    // // Indica che la ricarica è in pausa
    // setChargingStarted(false);
  };

  const handleStopCharging = () => {
    console.log("Charging stopped and reset!");

    // Interrompi l'intervallo se è attivo
    if (chargingTimer !== null) {
      window.clearInterval(chargingTimer);
      setChargingTimer(null);
    }

    // Resetta il contatore
    setChargingCounter(0);

    // Indica che la ricarica è stata fermata
    setChargingStarted(false);
  };

  return awake ? (
    <div className="App">
      <header className="App-header">
        <div className="content-container">
          {isEV ? (
            <div className="left-content">
              <h1>Welcome to ChargeWare</h1>
              {!paymentAuthorized && <p>Please insert your credit card</p>}
              {!chargingStarted && paymentAuthorized && (
                <button
                  className="StartChargingButton"
                  onClick={handleStartCharging}
                >
                  Start Charging
                </button>
              )}
              {(chargingStarted || chargingPaused) && (
                <ChargingTimer
                  handlePauseCharging={handlePauseCharging}
                  handleStopCharging={handleStopCharging}
                  chargingCounter={chargingCounter}
                  isChargingPaused={chargingPaused}
                />
              )}
            </div>
          ) : (
            <div className="left-content">
              <ParkingViolation />
            </div>
          )}
          {chargingStarted && isEV && (
            <div className="right-content">
              <PoiSuggestor
                location={{ lat: 45.464664, lng: 9.18854 }}
                userType={{ sex: "male", age: 20 }}
                timeOfDay={new Date(1699705891)}
                suggestedPlaces={setPlacesOfInterest}
              />
              <PlaceCardGroup places={placesOfInterest} />
            </div>
          )}
        </div>
      </header>
    </div>
  ) : (
    <div className="App">
      <img src="https://i.imgur.com/gAkqQP7.png" alt="loading" />
    </div>
  );
};

export default AppContent;
