import L, {
  Popup as LeafletPopupInstance,
  PopupOptions,
  LatLngExpression,
} from "leaflet";

export class LeafletPopup {
  private popup: LeafletPopupInstance | null = null;

  create(
    content: string | HTMLElement,
    latlng?: LatLngExpression,
    options?: PopupOptions
  ): LeafletPopupInstance {
    this.popup = L.popup(options);
    if (latlng) this.popup.setLatLng(latlng);
    this.popup.setContent(content);
    return this.popup;
  }

  getInstance() {
    return this.popup;
  }

  remove() {
    if (this.popup) {
      this.popup.remove();
      this.popup = null;
    }
  }
}
