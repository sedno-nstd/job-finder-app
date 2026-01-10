import { useMemo } from "react";
import { vacancies } from "../types";
import { CITIES } from "../../geo/cities";
import { getDistanceKm } from "../../geo/getDistanceKm";
import { Vacancy } from "../../../config/types";
import { getSalaryInUah } from "../../../config/salaryRules";
import { useSearchStore } from "@/src/store/useSearchStore";

export function useVacancies(
  visibleCount: number,
  userLocation: { lat: number; lon: number } | null,
  maxDistanceKm: number
) {
  const {
    finalSearch,
    minSalary,
    selectedPeriod,
    locationType,
    postingDate,
    level,
    geo,
    applySearch,
  } = useSearchStore();

  return useMemo(() => {
    let result: Vacancy[] = vacancies;

    if (locationType !== "any") {
      if (["remote", "office", "hybrid"].includes(locationType)) {
        result = result.filter((v) => v.jobLocation === locationType);
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

    if (minSalary > 0) {
      result = result.filter((v) => {
        if (v.salaryFrom === null || v.salaryFrom === undefined) {
          return false;
        }
        const vFrom = getSalaryInUah(v, selectedPeriod);
        const vTo = v.salaryTo
          ? getSalaryInUah({ ...v, salaryFrom: v.salaryTo }, selectedPeriod)
          : vFrom;

        const isWorthLooking = vTo >= minSalary;

        const isNotCrazyHigh = vFrom <= minSalary * 2.5;

        return isWorthLooking && isNotCrazyHigh;
      });
    }

    if (level && level !== "any") {
      result = result.filter((v) => (v.level as string[]).includes(level));
    }

    if (applySearch && finalSearch) {
      result = result.filter((v) =>
        v.title.toLowerCase().includes(finalSearch.toLowerCase())
      );
    }

    return {
      visible: result.slice(0, visibleCount),
      total: result.length,
    };
  }, [
    locationType,
    postingDate,
    level,
    geo,
    visibleCount,
    userLocation,
    maxDistanceKm,
    minSalary,
    selectedPeriod,
    finalSearch,
    applySearch,
  ]);
}
