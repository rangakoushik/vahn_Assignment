export interface EventDTO {
  id: string;
  title: string;
  description: string;
  startTime: string;
  location: string;
  distance: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
}
