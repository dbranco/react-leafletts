import L, {
  TileLayer as LeafletTileLayerInstance,
  TileLayerOptions,
} from "leaflet";

export class LeafletTileLayer {
  create(url: string, options?: TileLayerOptions): LeafletTileLayerInstance {
    return L.tileLayer(url, options);
  }
}
