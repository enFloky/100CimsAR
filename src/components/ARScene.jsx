import 'aframe';
import '@ar-js-org/ar.js';
import { useState, useEffect } from 'react';

const ARScene = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [mountains, setMountains] = useState([
    { name: "Pedraforca", latitude: 42.1328, longitude: 1.5983, altitude: 2506 },
    { name: "Puigmal", latitude: 42.3946, longitude: 2.1434, altitude: 2910 },
    { name: "Santa Brígida", latitude: 42.0156, longitude: 2.6467, altitude: 400 }
  ]);

  useEffect(() => {
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
  }, []);

  return (
    <a-scene embedded arjs="sourceType: webcam; debugUIEnabled: false;" vr-mode-ui="enabled: false">
      {/* Càmera per veure la imatge en directe de l'entorn */}
      <a-camera gps-camera rotation-reader></a-camera>

      {userLocation &&
        mountains.map((mountain, index) => (
          <a-entity
            key={index}
            gps-entity-place={`latitude: ${mountain.latitude}; longitude: ${mountain.longitude}`}
            position={`0 ${mountain.altitude - userLocation.altitude + 50} 0`}
          >
            {/* Afegim un fons amb el nom de la muntanya */}
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
        ))}
    </a-scene>
  );
};

export default ARScene;
