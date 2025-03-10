import { useState, useEffect } from "react";

if (!window.AFRAME) {
  import("aframe").then(() => {
    window.AFRAME = true;
  });
}

import "@ar-js-org/ar.js";

const ARScene = () => {
  const [coords, setCoords] = useState({ latitude: "??", longitude: "??" });

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

        {/* 🔴 Marcador per Santa Brígida */}
        <a-entity
          gps-entity-place="latitude: 41.9541; longitude: 2.6231;"
          scale="20 20 20"
          position="0 5 0"
          id="st-brigida"
          material="color: red;"
        >
          <a-text
            value="🗻 Santa Brígida"
            look-at="[gps-camera]"
            color="red"
            align="center"
            scale="30 30 30"
          ></a-text>
        </a-entity>
      </a-scene>

      {/* 📌 TEXT FIX A SOBRE AMB LES COORDENADES GPS */}
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
        📍 Coordenades: Lat {coords.latitude}, Lon {coords.longitude}
      </div>
    </>
  );
};

export default ARScene;
