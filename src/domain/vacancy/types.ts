import { SALARY_RULES } from "../../config/salaryRules";
import { POPULAR_PROFESSIONS } from "../../config/searchOptions";
import { Vacancy } from "../../config/types";
import { EMPLOYMENT_TYPES, jobLocations, locationPool } from "./mock";
import { createId } from "@paralleldrive/cuid2";

export type EmploymentTypeId = (typeof EMPLOYMENT_TYPES)[number]["id"];
export type JobLocation = (typeof jobLocations)[number];

const companies = ["Acme", "Globex", "Umbrella", "Initech"];
const levels = ["intern", "junior", "middle", "senior"] as const;
const stacks = [
  ["React", "TypeScript"],
  ["Node", "Express"],
  ["Vue", "JavaScript"],
];

const RANDOM_DESCRIPTIONS = [
  "We are looking for a passionate developer to join our core team. You will be responsible for building scalable web applications and collaborating with cross-functional teams.",
  "Join our fast-growing startup and help us revolutionize the industry. In this role, you will work on cutting-edge technologies and contribute to architectural decisions.",
  "An exciting opportunity for a detail-oriented engineer. You will focus on performance optimization, maintaining clean codebases, and implementing new features.",
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

  const randomLoc =
    locationPool[Math.floor(Math.random() * locationPool.length)];
  return {
    id: createId(),
    title:
      POPULAR_PROFESSIONS[
        Math.floor(Math.random() * POPULAR_PROFESSIONS.length)
      ],
    company: companies[Math.floor(Math.random() * companies.length)],
    description: RANDOM_DESCRIPTIONS[i % RANDOM_DESCRIPTIONS.length],
    salaryFrom: sFrom,
    salaryTo: sTo,
    currency: currency,
    salaryPeriod: salaryPeriod,
    negotiable: !hasSalary,
    level: [levels[Math.floor(Math.random() * levels.length)]],
    jobLocation:
      EMPLOYMENT_TYPES[Math.floor(Math.random() * EMPLOYMENT_TYPES.length)].id,
    stack: stacks[Math.floor(Math.random() * stacks.length)],
    city: randomLoc.city,
    country: randomLoc.country,

    postedAt: new Date(
      Date.now() - Math.floor(Math.random() * 10000000000),
    ).toISOString(),
  };
});
