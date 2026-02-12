import { COUNTRY_USER } from "@/src/components/constans/search-data";
import { CITIES } from "../geo/cities";

export const cityKeys = Object.keys(CITIES) as (keyof typeof CITIES)[];

export const jobLocations = ["remote", "office", "hybrid"] as const;

export const locationPool = COUNTRY_USER.flatMap((c) =>
  c.cities.map((city) => ({
    city: city,
    country: c.country,
    full: `${city}, ${c.country}`.toLowerCase(),
  })),
);
