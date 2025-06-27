import { renderHook } from "@testing-library/react";
import {
  MapContext,
  useMapContext,
} from "@react-leafletts/react/context/MapContext";
import { describe, it, expect, vi } from "vitest";
import L from "leaflet";
import { ReactNode } from "react";

describe("MapContext", () => {
  it("throws if used outside a MapContext.Provider", () => {
    expect(() => renderHook(() => useMapContext())).toThrow(
      "MapContext not found"
    );
  });

  it("provides the map context value when used within the provider", () => {
    const mapInstance = new L.Map(document.createElement("div"));
    const mockRegisterMarker = vi.fn();
    const mockGetMarkerById = vi.fn();

    const value = {
      map: mapInstance,
      registerMarker: mockRegisterMarker,
      getMarkerById: mockGetMarkerById,
    };

    const wrapper = ({ children }: { children?: ReactNode }) => (
      <MapContext.Provider value={value}>{children}</MapContext.Provider>
    );

    const { result } = renderHook(() => useMapContext(), { wrapper });

    expect(result.current.map).toBe(mapInstance);
    expect(result.current.registerMarker).toBe(mockRegisterMarker);
    expect(result.current.getMarkerById).toBe(mockGetMarkerById);
  });
});
