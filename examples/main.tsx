import { createRoot } from "react-dom/client";
import { Map } from "@react-leafletts/react";
import { Marker } from "@react-leafletts/react/atoms/Marker";
import { Popup } from "@react-leafletts/react/atoms/Popup";
import { TileLayer } from "@react-leafletts/react/atoms/TileLayer"; // assuming your TileLayer is ready
import { useMapContext } from "@react-leafletts/react/context/MapContext";

function TestControls() {
  const { getMarkerById } = useMapContext();

  const handleOpenPopup = () => {
    const marker = getMarkerById("main-marker");
    if (marker) {
      marker.openPopup();
    } else {
      console.warn("No marker found!");
    }
  };

  return (
    <button data-testid="open-popup" onClick={handleOpenPopup}>
      Open Popup
    </button>
  );
}

const root = createRoot(document.getElementById("root")!);

root.render(
  <div style={{ width: "100%", height: "100%" }}>
    <Map center={[0, 0]} zoom={2}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker id="main-marker" position={[0, 0]}>
        <Popup forMarkerId="main-marker" trigger="click" position={[0, 0]}>
          <div data-testid="popup-content">Hello from popup</div>
        </Popup>
      </Marker>
      <TestControls />
    </Map>
  </div>
);
