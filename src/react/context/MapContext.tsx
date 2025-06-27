import { createContext, useContext } from "react";
import type { Map as LeafletMap, Marker as LeafletMarker } from "leaflet";

export type MarkerRegistry = {
  [id: string]: LeafletMarker;
};

interface MapContextType {
  map: LeafletMap;
  registerMarker: (id: string, marker: LeafletMarker) => void;
  getMarkerById: (id: string) => LeafletMarker | undefined;
}

export const MapContext = createContext<MapContextType | undefined>(undefined);

export const useMapContext = () => {
  const ctx = useContext(MapContext);
  if (!ctx) throw new Error("MapContext not found");
  return ctx;
};
