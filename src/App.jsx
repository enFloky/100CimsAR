import { useState, useEffect } from "react";

if (!window.AFRAME) {
  import("aframe").then(() => {
    window.AFRAME = true;
  });
}

import "@ar-js-org/ar.js";

const ARScene = () => {
  const [coords, setCoords] = useState({ latitude: null, longitude: null });
  const [markerStatus, setMarkerStatus] = useState("🔍 Buscant marcador...");
  const [direction, setDirection] = useState(0);

  // 📍 Coordenades de Santa Brígida
  const targetCoords = { latitude: 41.9541, longitude: 2.6231 };

  useEffect(() => {
    if (!navigator.geolocation) {
      setCoords({ latitude: "GPS no suportat", longitude: "GPS no suportat" });
      return;
    }

    navigator.geolocation.watchPosition(
      (position) => {
        const userLat = position.coords.latitude;
        const userLon = position.coords.longitude;

        setCoords({
          latitude: userLat.toFixed(6),
          longitude: userLon.toFixed(6),
        });

        // 📍 Calcula la direcció entre l'usuari i Santa Brígida
        const userToTargetAngle = calculateBearing(
          userLat,
          userLon,
          targetCoords.latitude,
          targetCoords.longitude
        );
        setDirection(userToTargetAngle);
      },
      (error) => {
        setCoords({ latitude: "Error", longitude: error.message });
      },
      { enableHighAccuracy: true, maximumAge: 0, timeout: 5000 }
    );

    setTimeout(() => {
      const marker = document.getElementById("st-brigida");
      if (marker) {
        setMarkerStatus("✅ Marcador carregat!");
      } else {
        setMarkerStatus("❌ No s'ha trobat el marcador!");
      }
    }, 5000);
  }, []);

  // 🔄 Calcula la direcció cap al marcador
  const calculateBearing = (lat1, lon1, lat2, lon2) => {
    const toRadians = (deg) => (deg * Math.PI) / 180;
    const toDegrees = (rad) => (rad * 180) / Math.PI;

    const dLon = toRadians(lon2 - lon1);
    const lat1Rad = toRadians(lat1);
    const lat2Rad = toRadians(lat2);

    const y = Math.sin(dLon) * Math.cos(lat2Rad);
    const x =
      Math.cos(lat1Rad) * Math.sin(lat2Rad) -
      Math.sin(lat1Rad) * Math.cos(lat2Rad) * Math.cos(dLon);
    const bearing = toDegrees(Math.atan2(y, x));

    return (bearing + 360) % 360; // Assegurem que el valor està entre 0 i 360
  };

  return (
    <>
      {/* AR.js Scene */}
      <a-scene
        embedded
        arjs="sourceType: webcam; debugUIEnabled: false;"
        vr-mode-ui="enabled: false"
        renderer="logarithmicDepthBuffer: true;"
      >
        <a-camera gps-camera rotation-reader></a-camera>

        {/* 🔴 MARCADOR */}
        <a-entity
          gps-entity-place="latitude: 41.9541; longitude: 2.6231;"
          scale="50 50 50"
          position="0 20 0"
          id="st-brigida"
          material="color: red;"
        >
          <a-text
            value="🗻 SANTA BRÍGIDA"
            color="yellow"
            align="center"
            scale="100 100 100"
          ></a-text>
          <a-sphere radius="10" color="red"></a-sphere>
        </a-entity>
      </a-scene>

      {/* 📌 INFO DE DEPURACIÓ */}
      <div
        style={{
          position: "absolute",
          top: "10px",
          left: "10px",
          background: "rgba(0, 0, 0, 0.7)",
          color: "white",
          padding: "10px",
          borderRadius: "5px",
          fontSize: "14px",
          fontFamily: "Arial, sans-serif",
        }}
      >
        📍 Coordenades: Lat {coords.latitude}, Lon {coords.longitude} <br />
        {markerStatus}
      </div>

      {/* 🔄 FLETXA QUE APUNTA CAP AL MARCADOR */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: `translate(-50%, -50%) rotate(${direction}deg)`,
          fontSize: "50px",
        }}
      >
        🔺
      </div>
    </>
  );
};

export default ARScene;
