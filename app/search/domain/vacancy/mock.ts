import { CITIES } from "../geo/cities";

export const cityKeys = Object.keys(CITIES) as (keyof typeof CITIES)[];

export const jobLocations = ["remote", "office", "hybrid"] as const;
