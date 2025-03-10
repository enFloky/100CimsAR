import { useState, useEffect } from "react";

if (!window.AFRAME) {
  import("aframe").then(() => {
    window.AFRAME = true;
  });
}

import "@ar-js-org/ar.js";

const ARScene = () => {
  const [coords, setCoords] = useState({ latitude: "??", longitude: "??" });
  const [markerStatus, setMarkerStatus] = useState("🔍 Buscant marcador...");

  useEffect(() => {
    if (!navigator.geolocation) {
      setCoords({ latitude: "GPS no suportat", longitude: "GPS no suportat" });
      return;
    }

    navigator.geolocation.watchPosition(
      (position) => {
        setCoords({
          latitude: position.coords.latitude.toFixed(6),
          longitude: position.coords.longitude.toFixed(6),
        });
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

        {/* 🔴 MARCADOR MOLT GRAN */}
        <a-entity
          gps-entity-place="latitude: 41.9541; longitude: 2.6231;"
          scale="100 100 100"
          position="0 50 0"
          id="st-brigida"
          material="color: red;"
        >
          <a-text
            value="🗻 SANTA BRÍGIDA"
            color="yellow"
            align="center"
            scale="200 200 200"
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
    </>
  );
};

export default ARScene;
