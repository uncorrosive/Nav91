export const MAP_CONFIG = {
  API_KEY: 'DFLjkvqxhcNMzypwWLiD',
  DEFAULT_CENTER: [-73.2108, 44.4772] as [number, number], // Center of Burlington
  DEFAULT_ZOOM: 14,
  USER_LOCATION_ZOOM: 15,
  SELECTED_ZOOM: 16,
  ANIMATION_DURATION: 2000,
  MIN_ZOOM: 2,
  MAX_ZOOM: 18,
  BURLINGTON_BOUNDS: [
    [-73.2200, 44.4700], // Southwest coordinates
    [-73.1800, 44.4800]  // Northeast coordinates
  ] as [[number, number], [number, number]]
} as const;