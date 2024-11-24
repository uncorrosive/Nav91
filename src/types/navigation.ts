export interface Place {
  id: string;
  name: string;
  description: string;
  icon: string;
  coords: [number, number];
  buildings: Building[];
}

export interface Building {
  id: string;
  name: string;
  description: string;
  icon: string;
  coords: [number, number];
  amenities?: string[];
  accessibility?: string[];
}