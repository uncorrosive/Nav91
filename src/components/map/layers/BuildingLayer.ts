import * as maptilersdk from '@maptiler/sdk';

export class BuildingLayer {
  private map: maptilersdk.Map;
  private layerId = '3d-buildings';

  constructor(map: maptilersdk.Map) {
    this.map = map;
  }

  public add(): void {
    if (this.map.getLayer(this.layerId)) return;

    this.map.addLayer({
      id: this.layerId,
      source: 'composite',
      'source-layer': 'building',
      filter: ['==', 'extrude', 'true'],
      type: 'fill-extrusion',
      minzoom: 15,
      paint: {
        'fill-extrusion-color': '#aaa',
        'fill-extrusion-height': ['get', 'height'],
        'fill-extrusion-base': ['get', 'min_height'],
        'fill-extrusion-opacity': 0.6
      }
    });
  }

  public remove(): void {
    if (this.map.getLayer(this.layerId)) {
      this.map.removeLayer(this.layerId);
    }
  }
}