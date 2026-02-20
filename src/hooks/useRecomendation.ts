import { Vacancy } from "../config/types";
import { OnboardingData } from "../types/user";

interface Props {
  user: OnboardingData;
  vacancy: Vacancy[];
}

export function useRecommendation({ user, vacancy }: Props) {
  if (!user || !vacancy) return [];

  const jobPattern =
    user.desiredJob.length > 0 ? new RegExp(user.desiredJob.join("|")) : ".*";

  const jobRegex = new RegExp(jobPattern, "i");

  const recommendations = vacancy
    .map((v) => {
      let score = 0;

      const titleMatch = jobRegex.test(v.title);

      if (titleMatch) score += 10;

      const isTypeMatch = user.employmentType.some((item) =>
        item.toLowerCase().includes(v.employmentType?.toLowerCase()),
      );

      if (isTypeMatch) score += 5;

      const city = v.city?.toLowerCase() || "";
      const country = v.country.toLowerCase() || "";
      const userLoc = user.location?.toLowerCase().trim() || "";

      const isHomeCity = city.includes(userLoc) || country.includes(userLoc);
      const isRelocationCity =
        user.readyToRelocate &&
        user.relocationLocations?.some((loc) => loc.toLowerCase() === city);

      if (isHomeCity) {
        score += 7;
      } else if (isRelocationCity || user.readyForWorkAbroad) {
        score += 4;
      }

      return { ...v, score };
    })

    .filter((item) => item.score > 0)

    .sort((a, b) => b.score - a.score);

  return recommendations.length > 0 ? recommendations : vacancy.slice(-10);
}
