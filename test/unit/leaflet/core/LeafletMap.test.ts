import { describe, it, expect } from "vitest";
import { LeafletMap } from "@react-leafletts/leaflet";

describe("LeafletMap", () => {
  it("initializes map instance", () => {
    const div = document.createElement("div");
    const map = new LeafletMap();
    const instance = map.create(div, { center: [0, 0], zoom: 1 });
    expect(instance).toBeDefined();
  });
});
