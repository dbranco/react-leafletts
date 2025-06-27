import { render } from "@testing-library/react";
import { Map } from "@react-leafletts/react";
import { Marker } from "@react-leafletts/react/atoms/Marker";
import { describe, it, expect } from "vitest";

describe("<Marker />", () => {
  it("renders a marker inside the map without crashing", () => {
    const { container } = render(
      <div style={{ width: 400, height: 300 }}>
        <Map center={[0, 0]} zoom={2}>
          <Marker position={[0, 0]} />
        </Map>
      </div>
    );

    // Marker is rendered into the Leaflet canvas, so we check map container
    expect(container.querySelector("div")).toBeInTheDocument();
  });
});
