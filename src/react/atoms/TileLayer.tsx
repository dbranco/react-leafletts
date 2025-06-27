import { useEffect } from "react";
import { LeafletTileLayer } from "@react-leafletts/leaflet";
import { useMapContext } from "../context/MapContext";

interface TileLayerProps {
  url: string;
  options?: L.TileLayerOptions;
}

export const TileLayer = ({ url, options }: TileLayerProps) => {
  const { map } = useMapContext();
  useEffect(() => {
    const tile = new LeafletTileLayer();
    const layer = tile.create(url, options);
    layer.addTo(map);

    return () => {
      map.removeLayer(layer);
    };
  }, [map, url]);

  return null;
};
