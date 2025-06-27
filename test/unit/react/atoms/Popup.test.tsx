import {
  render,
  screen,
  fireEvent,
  act,
  waitFor,
} from "@testing-library/react";
import { Map } from "@react-leafletts/react";
import { Marker } from "@react-leafletts/react/atoms/Marker";
import { Popup } from "@react-leafletts/react/atoms/Popup";
import { describe, it, expect } from "vitest";
import { LeafletMarker } from "@react-leafletts/leaflet";
import { createRef, useRef } from "react";

describe("<Popup /> with JSX", () => {
  it("renders JSX content inside the Leaflet popup", async () => {
    render(
      <div style={{ width: 400, height: 300 }}>
        <Map center={[0, 0]} zoom={2}>
          <Popup forMarkerId="not-needed" position={[0, 0]} trigger="manual">
            <div data-testid="popup-content">
              <h4>Hello</h4>
              <button onClick={() => {}}>Test</button>
            </div>
          </Popup>
        </Map>
      </div>
    );

    // simulate Leaflet automatically opening popup
    const popupContent = await screen.findByTestId("popup-content");
    expect(popupContent).toBeInTheDocument();
  });

  // FIXME dont work as unit test
  // E2E candidate
  // The createRef is not a hook and is not mutable meaning not able to rerender if it changes the ref so popup doesnt get the ref
  // also render from react testing library is not fully mounted app meaning probably the context is not fully working
  // still thinking in the code and how to make it testable
  it.skip("opens popup on marker click", async () => {
    const markerRef = createRef<L.Marker | null>();

    render(
      <Map center={[0, 0]} zoom={2}>
        <Marker id="test-marker" position={[0, 0]} ref={markerRef}>
          <Popup forMarkerId="test-marker" trigger="click">
            <div data-testid="popup-content">Popup content</div>
          </Popup>
        </Marker>
      </Map>
    );

    // Wait for the marker to be ready (registered and mounted)
    console.log("Start test: markerRef.current =", markerRef.current);
    await waitFor(
      () => {
        console.log("Waiting: markerRef.current =", markerRef.current);
        expect(markerRef.current).toBeTruthy();
      },
      { timeout: 4000 }
    );

    // Wait a bit more to ensure popup useEffect interval binds the popup
    await new Promise((resolve) => setTimeout(resolve, 200)); // allow popup to attach

    act(() => {
      markerRef.current!.fire("click");
    });

    const popupContent = await screen.findByTestId("popup-content");
    expect(popupContent).toBeInTheDocument();
  });
});
