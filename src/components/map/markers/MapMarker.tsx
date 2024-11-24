import * as maptilersdk from '@maptiler/sdk';

export class MapMarker {
  private marker: maptilersdk.Marker;
  private element: HTMLElement;

  constructor(map: maptilersdk.Map, initialCoords: [number, number]) {
    this.element = this.createMarkerElement();
    
    this.marker = new maptilersdk.Marker({
      element: this.element,
      anchor: 'center'
    })
    .setLngLat(initialCoords)
    .addTo(map);

    // Force GPU acceleration
    this.element.style.willChange = 'transform';
  }

  private createMarkerElement(): HTMLElement {
    const el = document.createElement('div');
    
    el.className = 'absolute duration-0 ease-linear';
    el.innerHTML = `
      <div class="relative w-6 h-6 translate-x-[-50%] translate-y-[-50%]">
        <div class="absolute inset-0">
          <div class="absolute inset-0 bg-blue-400 rounded-full opacity-75 animate-ping"></div>
        </div>
        <div class="absolute inset-0 bg-blue-500 rounded-full border-2 border-white shadow-lg"></div>
      </div>
    `;
    
    return el;
  }

  public setPosition(coords: [number, number]): void {
    requestAnimationFrame(() => {
      this.marker.setLngLat(coords);
    });
  }

  public getPosition(): mapboxgl.LngLat | null {
    return this.marker.getLngLat();
  }

  public remove(): void {
    this.marker.remove();
  }
}