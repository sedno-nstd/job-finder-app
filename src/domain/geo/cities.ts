export type City = {
  name: string;
  lat?: number;
  lon?: number;
};

export const CITIES: Record<string, City> = {
  Warsaw: {
    name: "Warsaw",
    lat: 52.2297,
    lon: 21.0122,
  },
  Berlin: {
    name: "Berlin",
    lat: 52.52,
    lon: 13.405,
  },
  London: {
    name: "London",
    lat: 51.5074,
    lon: -0.1278,
  },
};
