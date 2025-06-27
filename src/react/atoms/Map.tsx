import { useEffect, useRef, useState } from "react";
import { LeafletMap } from "@react-leafletts/leaflet";
import { MapContext, MarkerRegistry } from "../context/MapContext";
import L from "leaflet";

interface MapProps {
  center?: L.LatLngExpression;
  zoom?: number;
  children?: React.ReactNode;
}

export const Map = ({ center = [0, 0], zoom = 2, children }: MapProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [mapInstance, setMapInstance] = useState<L.Map | null>(null);
  const markerMapRef = useRef<MarkerRegistry>({});

  useEffect(() => {
    if (!ref.current) return;

    const map = new LeafletMap();
    const instance = map.create(ref.current, { center, zoom });
    setMapInstance(instance);

    return () => map.destroy();
  }, []);

  const registerMarker = (id: string, marker: L.Marker) => {
    markerMapRef.current[id] = marker;
  };

  const getMarkerById = (id: string) => {
    const marker = markerMapRef.current[id];
    if (!marker) {
      console.warn(`No marker found with ID ${id}`);
    }
    return marker;
  };

  return (
    <>
      <div ref={ref} style={{ width: "100%", height: "100%" }} />
      {mapInstance && (
        <MapContext.Provider
          value={{ map: mapInstance, registerMarker, getMarkerById }}
        >
          {children}
        </MapContext.Provider>
      )}
    </>
  );
};
