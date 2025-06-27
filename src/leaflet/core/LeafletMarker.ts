import L, {
  Marker as LeafletMarkerInstance,
  MarkerOptions,
  LatLngExpression,
} from "leaflet";

export class LeafletMarker {
  private marker: LeafletMarkerInstance | null = null;

  create(
    position: LatLngExpression,
    options?: MarkerOptions
  ): LeafletMarkerInstance {
    this.marker = L.marker(position, options);
    return this.marker;
  }

  getInstance() {
    return this.marker;
  }

  remove() {
    if (this.marker) {
      this.marker.remove();
      this.marker = null;
    }
  }
}
