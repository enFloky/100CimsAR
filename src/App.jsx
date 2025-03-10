import { useEffect } from "react";

if (!window.AFRAME) {
  import("aframe").then(() => {
    window.AFRAME = true;
  });
}

import "@ar-js-org/ar.js";

const ARScene = () => {
  useEffect(() => {
    console.log("ARScene carregada!");
  }, []);

  return (
    <a-scene
      embedded
      arjs="sourceType: webcam; debugUIEnabled: false;"
      vr-mode-ui="enabled: false"
      renderer="logarithmicDepthBuffer: true;"
      gesture-detector
    >
      <a-camera gps-camera rotation-reader></a-camera>

      {/* 🔴 Marcador per Santa Brígida */}
      <a-entity
        gps-entity-place="latitude: 41.9541; longitude: 2.6231;"
        scale="10 10 10"
      >
        <a-text
          value="🗻 Santa Brígida"
          look-at="[gps-camera]"
          color="red"
          align="center"
          scale="10 10 10"
        ></a-text>
      </a-entity>
    </a-scene>
  );
};

export default ARScene;
