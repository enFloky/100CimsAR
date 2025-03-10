import { useEffect } from "react";

if (!window.AFRAME) {
  import("aframe").then(() => {
    window.AFRAME = true;
  });
}

import "@ar-js-org/ar.js";

const ARScene = () => {
  useEffect(() => {
    alert("🔄 ARScene carregada!");

    navigator.geolocation.getCurrentPosition(
      (position) => {
        alert(`📍 GPS Actiu! Lat: ${position.coords.latitude}, Lon: ${position.coords.longitude}`);
      },
      (error) => {
        alert(`❌ Error GPS: ${error.message}`);
      }
    );
  }, []);

  return (
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
  );
};

export default ARScene;
