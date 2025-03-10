import React, { useState, useEffect } from 'react';
import 'aframe';
import '@ar-js-org/ar.js';

const PeakFinderPanel = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [userHeading, setUserHeading] = useState(null);
  const [mountains, setMountains] = useState([
    { name: "Pedraforca", latitude: 42.1328, longitude: 1.5983, altitude: 2506 },
    { name: "Puigmal", latitude: 42.3946, longitude: 2.1434, altitude: 2910 },
    { name: "Santa Brígida", latitude: 42.0156, longitude: 2.6467, altitude: 400 }
  ]);

  useEffect(() => {
    // Obtenir la ubicació de l'usuari
    if ("geolocation" in navigator) {
      navigator.geolocation.watchPosition(
        (position) => {
          setUserLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            altitude: position.coords.altitude || 0
          });
        },
        console.error,
        { enableHighAccuracy: true }
      );
    }

    // Obtenir l'orientació (brúixola)
    if ("DeviceOrientationEvent" in window) {
      window.addEventListener("deviceorientation", (e) => {
        setUserHeading(e.alpha); // alpha és la direcció de la brúixola
      });
    }
  }, []);

  return (
    <div>
      <h2>Mapa i AR de les Muntanyes</h2>

      {/* Botó per alternar entre mapa i AR */}
      <button onClick={() => setShowAR(!showAR)} style={{ marginBottom: "20px" }}>
        {showAR ? "Veure Mapa" : "Veure en AR"}
      </button>

      {/* Mostrar AR o Mapa */}
      <a-scene embedded arjs="sourceType: webcam; debugUIEnabled: false;">
        {/* Càmera per AR */}
        <a-camera gps-camera rotation-reader></a-camera>

        {userLocation && userHeading &&
          mountains.map((mountain, index) => {
            // Calcular el rumb cap a la muntanya
            const bearing = calculateBearing(userLocation, mountain);

            return (
              <a-entity
                key={index}
                gps-entity-place={`latitude: ${mountain.latitude}; longitude: ${mountain.longitude}`}
                position={`0 ${mountain.altitude - userLocation.altitude + 50} 0`}
                rotation={`0 ${bearing - userHeading} 0`} // Ajustar rotació segons l'orientació
              >
                {/* Afegir un fons amb el nom de la muntanya */}
                <a-plane
                  position="0 0 0"
                  width="5"
                  height="1.5"
                  color="#32a852"
                  opacity="0.8"
                  look-at="[gps-camera]"
                >
                  <a-text
                    value={mountain.name + " - " + mountain.altitude + "m"}
                    look-at="[gps-camera]"
                    color="white"
                    align="center"
                    font="mozillavr"
                    width="4"
                    scale="2 2 2"
                  ></a-text>
                </a-plane>
              </a-entity>
            );
          })}
      </a-scene>
    </div>
  );
}

export default PeakFinderPanel;

// Funció per calcular el rumb entre la ubicació de l'usuari i la muntanya
const calculateBearing = (userLocation, mountain) => {
  const lat1 = userLocation.latitude * Math.PI / 180;
  const lon1 = userLocation.longitude * Math.PI / 180;
  const lat2 = mountain.latitude * Math.PI / 180;
  const lon2 = mountain.longitude * Math.PI / 180;

  const dLon = lon2 - lon1;

  const y = Math.sin(dLon) * Math.cos(lat2);
  const x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLon);

  const initialBearing = Math.atan2(y, x);
  const degrees = (initialBearing * 180 / Math.PI + 360) % 360;
  return degrees;
};
