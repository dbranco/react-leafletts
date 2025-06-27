import L from "leaflet";

export class LeafletMap {
  private map: L.Map | null = null;

  create(container: HTMLElement, options: L.MapOptions) {
    this.map = L.map(container, options);
    return this.map;
  }

  getInstance() {
    return this.map;
  }

  destroy() {
    this.map?.remove();
    this.map = null;
  }
}
