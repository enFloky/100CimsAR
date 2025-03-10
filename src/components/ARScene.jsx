import 'aframe';
import '@ar-js-org/ar.js';
import { useState, useEffect } from 'react';

const ARScene = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [mountains, setMountains] = useState([
    { name: "Santa Brígida", latitude: 42.0156, longitude: 2.6467, altitude: 400 },
    { name: "Puigmal", latitude: 42.3946, longitude: 2.1434, altitude: 2910 }
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
      <a-camera gps-camera rotation-reader></a-camera>

      {userLocation &&
        mountains.map((mountain, index) => (
          <a-entity
            key={index}
            gps-entity-place={`latitude: ${mountain.latitude}; longitude: ${mountain.longitude}`}
            position={`0 ${mountain.altitude - userLocation.altitude + 50} 0`}
            scale="10 10 10"
          >
            <a-image 
              src="/pin.png" 
              look-at="[gps-camera]" 
              width="4" 
              height="4"
            ></a-image>
            <a-text 
              value={mountain.name} 
              look-at="[gps-camera]" 
              color="red" 
              scale="5 5 5"
              position="0 3 0"
            ></a-text>
          </a-entity>
        ))}
    </a-scene>
  );
};

export default ARScene;
