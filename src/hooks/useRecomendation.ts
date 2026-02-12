import { Vacancy } from "../config/types";
import { vacancies } from "../domain/vacancy/types";
import { OnboardingData } from "../types/user";

interface Props {
  user: OnboardingData | null;
  vacancy: Vacancy[];
}

export function useRecommendation({ user }: Props) {
  if (!user) return [];

  let result = vacancies;

  const userLocation = user.location;
  const relocationCities = user.relocationLocations || [];
  const desiredUserJob = user.desiredJob || [];
  const userJobTypes = user.employmentType || [];

  if (
    userLocation ||
    desiredUserJob.length > 0 ||
    relocationCities.length > 0
  ) {
    result = result.filter((item) => {
      const matchJob =
        desiredUserJob.length === 0 ||
        desiredUserJob.some((j) => j === item.title);

      const itemCity = item.city?.toLowerCase() || "";
      const itemCountry = item.country?.toLowerCase() || "";

      const matchLoc =
        itemCity.includes(user.location) || itemCountry.includes(user.location);

      const mathJobType =
        userJobTypes.length === 0 ||
        userJobTypes.some((j) => j.includes(item.jobLocation));

      return matchJob && (matchLoc || mathJobType);
    });
  }

  return result.length > 0 ? result : vacancies.slice(-10);
}
