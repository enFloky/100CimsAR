import { useEffect } from "react";

// Comprovar si A-Frame ja està carregat per evitar duplicats
if (!window.AFRAME) {
  import("aframe");
}
import "@ar-js-org/ar.js";

const ARScene = () => {
  useEffect(() => {
    console.log("ARScene carregada!");
  }, []);

  return (
    <a-scene embedded arjs="sourceType: webcam; debugUIEnabled: false;">
      <a-camera gps-camera rotation-reader></a-camera>
      <a-text value="Hola AR!" position="0 2 -5" color="red"></a-text>
    </a-scene>
  );
};

export default ARScene;
