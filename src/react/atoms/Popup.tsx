import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { LeafletPopup } from "@react-leafletts/leaflet";
import { useMapContext } from "../context/MapContext";
import type { LatLngExpression, PopupOptions } from "leaflet";

interface PopupProps {
  forMarkerId: string;
  position?: LatLngExpression;
  options?: PopupOptions;
  trigger?: "click" | "hover" | "manual";
  children: React.ReactNode;
}

export const Popup = ({
  forMarkerId,
  position,
  options,
  trigger = "click",
  children,
}: PopupProps) => {
  const { map, getMarkerById } = useMapContext();
  const containerRef = useRef<HTMLDivElement>(document.createElement("div"));
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const popup = new LeafletPopup();
    const popupInstance = popup.create(containerRef.current, position, options);

    let interval: NodeJS.Timeout;

    const tryBindPopup = () => {
      const marker = getMarkerById(forMarkerId);
      if (!marker) {
        console.warn(`No marker found with ID ${forMarkerId}`);
        return;
      }

      if (marker) {
        marker.bindPopup(containerRef.current);

        if (trigger === "hover") {
          marker.on("mouseover", () => marker.openPopup());
          marker.on("mouseout", () => marker.closePopup());
        }

        setVisible(true);
        clearInterval(interval);
      }
    };

    if (trigger === "manual" && position) {
      popupInstance.addTo(map);
      setVisible(true);
    } else if (trigger === "manual" && !position) {
      console.warn("Popup in manual mode requires 'position' prop.");
    }

    if (trigger === "click" || trigger === "hover") {
      interval = setInterval(tryBindPopup, 50);
    }

    return () => {
      clearInterval(interval);
      popup.remove();
      setVisible(false);
    };
  }, [map, forMarkerId, position, trigger]);

  return visible && createPortal(children, containerRef.current);
};
