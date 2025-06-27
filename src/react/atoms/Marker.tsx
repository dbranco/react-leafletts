import { useEffect, forwardRef, useImperativeHandle, useRef } from "react";
import { LeafletMarker } from "@react-leafletts/leaflet";
import { useMapContext } from "../context/MapContext";
import type {
  LatLngExpression,
  MarkerOptions,
  Marker as LMarker,
} from "leaflet";

interface MarkerProps {
  id: string;
  position: LatLngExpression;
  options?: MarkerOptions;
  children?: React.ReactNode;
}

// Forward ref to expose internal L.Marker to parent
export const Marker = forwardRef<LMarker | null, MarkerProps>(
  ({ id, position, options, children }, ref) => {
    const { map, registerMarker } = useMapContext();
    const markerRef = useRef<LMarker | null>(null);

    useEffect(() => {
      const marker = new LeafletMarker();
      const markerInstance = marker.create(position, options);
      markerInstance.addTo(map);
      markerRef.current = markerInstance;

      // Register marker in context (e.g., for use in Popup)
      registerMarker(id, markerInstance);

      return () => {
        markerInstance.remove();
        markerRef.current = null;
      };
    }, [map, position, options, id, registerMarker]);

    // Expose the marker instance to parent via ref
    useImperativeHandle<LMarker | null, LMarker | null>(
      ref,
      () => markerRef.current,
      [markerRef.current]
    );

    return children ?? null;
  }
);
