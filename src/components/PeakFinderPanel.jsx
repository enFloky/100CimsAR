import React, { useEffect, useState } from "react";

const PeakFinderPanel = () => {
  const [location, setLocation] = useState(null);
  const [panel, setPanel] = useState(null);

  useEffect(() => {
    // Comprovar si el navegador suporta les tecnologies necessàries
    if (!window.PeakFinder || !window.PeakFinder.utils.caniuse()) {
      console.error("El navegador no suporta PeakFinder.");
      return;
    }

    // Obtenir la ubicació de l'usuari
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ lat: latitude, lng: longitude });

        // Crear el panell de PeakFinder
        const pfPanel = new window.PeakFinder.PanoramaPanel({
          canvasid: "pfcanvas",
          locale: "ca", // Idioma català
        });

        pfPanel.init(() => {
          pfPanel.settings.distanceUnit(0); // Sistema mètric
          pfPanel.loadViewpoint(latitude, longitude, "La meva ubicació");
          pfPanel.fieldofview(45.0, 2.0);
          pfPanel.azimut(180.0, 2.0);
        });

        setPanel(pfPanel);
      },
      (error) => {
        console.error("Error obtenint la ubicació:", error);
      },
      { enableHighAccuracy: true }
    );
  }, []);

  return (
    <div style={{ width: "100%", height: "500px", position: "relative" }}>
      <canvas id="pfcanvas" style={{ width: "100%", height: "100%" }}></canvas>
      {!location && <p>Obtenint la teva ubicació...</p>}
    </div>
  );
};

export default PeakFinderPanel;
