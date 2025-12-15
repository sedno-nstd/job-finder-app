import { useEffect, useMemo } from "react";
import { vacancies, Vacancy } from "./types";
import { CITIES } from "../geo/cities";
import { getDistanceKm } from "../geo/getDistanceKm";
import { POSTING_DATE_OPTIONS } from "../../config/categories";

export function useVacancies(
  search: string,
  visibleCount: number,
  postingDate: string,
  userLocation: { lat: number; lon: number } | null,
  maxDistanceKm: number,
  level: string,
  jobLocation: "all" | "remote" | "office" | "hybrid",
  geo: "all" | "near"
) {
  return useMemo(() => {
    let result: Vacancy[] = vacancies;

    if (search) {
      result = result.filter((v) =>
        v.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (jobLocation !== "all") {
      if (["remote", "office", "hybrid"].includes(jobLocation)) {
        result = result.filter((v) => v.jobLocation === jobLocation);
      }
    }

    if (userLocation && maxDistanceKm != null && geo === "near") {
      result = result.filter((v) => {
        if (!v.city) return false;
        const city = CITIES[v.city];
        return (
          getDistanceKm(
            userLocation.lat,
            city.lat!,
            userLocation.lon,
            city.lon!
          ) <= maxDistanceKm
        );
      });
    }

    if (postingDate !== "any") {
      const now = Date.now();
      let cutoffTime = 0;
      switch (postingDate) {
        case "24h":
          cutoffTime = now - 24 * 60 * 60 * 1000;
          break;
        case "3d":
          cutoffTime = now - 3 * 24 * 60 * 60 * 1000;
          break;
        case "7d":
          cutoffTime = now - 7 * 24 * 60 * 60 * 1000;
          break;
      }
      if (cutoffTime > 0) {
        result = result.filter((v) => {
          return new Date(v.postedAt).getTime() >= cutoffTime;
        });
      }
      result = result.sort(
        (a, b) =>
          new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime()
      );
    }

    if (level && level !== "" && level !== "any") {
      result = result.filter((e) => e.level.includes(level));
    }
    return {
      visible: result.slice(0, visibleCount),
      total: result.length,
    };
  }, [search, visibleCount, userLocation, maxDistanceKm, postingDate, level]);
}
