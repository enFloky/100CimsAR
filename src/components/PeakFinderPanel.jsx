import React, { useEffect, useState } from "react";

const PeakFinderPanel = () => {
  const [location, setLocation] = useState(null);
  const [panel, setPanel] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!window.PeakFinder || !window.PeakFinder.utils.caniuse()) {
      setError("El navegador no suporta PeakFinder.");
      return;
    }

    // Obtenir ubicació de l'usuari
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ lat: latitude, lng: longitude });

        // Crear panell PeakFinder
        const pfPanel = new window.PeakFinder.PanoramaPanel({
          canvasid: "pfcanvas",
          locale: "ca", // Català
        });

        pfPanel.init(() => {
          pfPanel.settings.distanceUnit(0); // Sistema mètric
          pfPanel.loadViewpoint(latitude, longitude, "Ubicació actual");
          pfPanel.fieldofview(45.0, 2.0);
          pfPanel.azimut(180.0, 2.0);
        });

        setPanel(pfPanel);
      },
      (err) => {
        setError("No s'ha pogut obtenir la ubicació.");
        console.error("Error de geolocalització:", err);
      },
      { enableHighAccuracy: true }
    );
  }, []);

  return (
    <div style={{ width: "100%", height: "500px", position: "relative" }}>
      <canvas id="pfcanvas" style={{ width: "100%", height: "100%" }}></canvas>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {!location && <p>Obtenint la teva ubicació...</p>}
    </div>
  );
};

export default PeakFinderPanel;
