import { SALARY_RULES } from "../../config/salaryRules";
import { MOCK_TITLES } from "../../config/searchOptions";
import { Vacancy } from "../../config/types";
import { cityKeys, jobLocations } from "./mock";

export type JobLocation = (typeof jobLocations)[number];

const companies = ["Acme", "Globex", "Umbrella", "Initech"];
const levels = ["intern", "junior", "middle", "senior"] as const;
const stacks = [
  ["React", "TypeScript"],
  ["Node", "Express"],
  ["Vue", "JavaScript"],
];

export const vacancies: Vacancy[] = Array.from({ length: 200 }, (_, i) => {
  const hasSalary = Math.random() > 0.3;
  const currency = (
    Math.random() > 0.8 ? "USD" : "UAH"
  ) as keyof typeof SALARY_RULES;
  const salaryPeriod = Math.random() > 0.5 ? "hour" : "month";

  const rule = SALARY_RULES[currency][salaryPeriod];

  const sFrom = Math.floor(rule.min + Math.random() * rule.range);
  const sTo = sFrom ? Math.floor(sFrom * (1.2 + Math.random() * 0.4)) : null;

  return {
    id: (i + 1).toString(),
    title: MOCK_TITLES[Math.floor(Math.random() * MOCK_TITLES.length)],
    company: companies[Math.floor(Math.random() * companies.length)],
    salaryFrom: sFrom,
    salaryTo: sTo,
    currency: currency,
    salaryPeriod: salaryPeriod,
    negotiable: !hasSalary,
    level: [levels[Math.floor(Math.random() * levels.length)]],
    jobLocation: jobLocations[Math.floor(Math.random() * jobLocations.length)],
    stack: stacks[Math.floor(Math.random() * stacks.length)],
    city:
      Math.random() > 0.2
        ? cityKeys[Math.floor(Math.random() * cityKeys.length)]
        : undefined,
    postedAt: new Date(
      Date.now() - Math.floor(Math.random() * 10000000000)
    ).toISOString(),
  };
});
