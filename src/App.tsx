import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

interface Place {
  name: string;
  description: string;
}

function App() {
  const [isEV, setIsEV] = useState(true);
  const [placesOfInterest, setPlacesOfInterest] = useState<Place[]>([]);
  const [chargingCounter, setChargingCounter] = useState<number>(0);
  const [chargingTimer, setChargingTimer] = useState<number | null>(null);
  const [chargingStarted, setChargingStarted] = useState<boolean>(false);

  useEffect(() => {
    axios.get('http://127.0.0.1:5000/valid/TARGA123')
      .then(response => {
        setIsEV(response.data.isEV);
      })
      .catch(error => {
        console.error('Error fetching data from the API:', error);
      });

    // Simulazione di luoghi di interesse (sostituisci con la logica reale)
    const simulatedPlaces: Place[] = [
      { name: 'Place 1', description: 'Description 1' },
      { name: 'Place 2', description: 'Description 2' },
      // ... altri luoghi di interesse
    ];

    setPlacesOfInterest(simulatedPlaces);
  }, []);

  const handleStartCharging = () => {
    console.log('Charging started!');

    // Avvia un intervallo per aumentare il contatore ogni secondo
    const timer = window.setInterval(() => {
      setChargingCounter(prevCounter => prevCounter + 1);
    }, 1000);

    // Aggiorna lo stato dell'intervallo e che la ricarica è iniziata
    setChargingTimer(timer);
    setChargingStarted(true);
  };

  const handlePauseCharging = () => {
    console.log('Charging paused!');

    // Interrompi l'intervallo se è attivo
    if (chargingTimer !== null) {
      window.clearInterval(chargingTimer);
      setChargingTimer(null);
    }

    // Indica che la ricarica è in pausa
    setChargingStarted(false);
  };

  const handleStopCharging = () => {
    console.log('Charging stopped and reset!');

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

  return (
    <div className="App">
      <header className="App-header">
        <div className="content-container">
          {isEV ? (
            <div className="left-content">
              <h1>Welcome to ChargeWare</h1>
              {!chargingStarted && (
                <button className="StartChargingButton" onClick={handleStartCharging}>
                  Start Charging
                </button>
              )}
              {chargingStarted && (
                <>
                  <button className="PauseChargingButton" onClick={handlePauseCharging}>
                    Pause Charging
                  </button>
                  <button className="StopChargingButton" onClick={handleStopCharging}>
                    Stop Charging
                  </button>
                </>
              )}
              <p>Charging Time: {chargingCounter} seconds</p>
            </div>
          ) : (
            <div className="left-content">
              <h2>Alert!</h2>
              <p>You're not an EV, leave the charging spot to someone electric!</p>
            </div>
          )}

          {/* Google Maps Section */}
          <div className="right-content">
            <iframe
              title="Google Map"
              width="100%"
              height="300px"
              frameBorder="0"
              style={{ border: 0 }}
              src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyAki2anj1hZDJDjKpUqK2LH2rucIU7gkmw&q=charging+station`}
              allowFullScreen
            ></iframe>

            {/* Cards per i luoghi di interesse */}
            <div className="places-of-interest">
              <h3>Places of Interest</h3>
              <div className="place-cards-container">
                {placesOfInterest.map((place, index) => (
                  <div key={index} className="place-card">
                    <h4>{place.name}</h4>
                    <p>{place.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
