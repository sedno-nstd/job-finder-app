import { CITIES } from "../geo/cities";
import { cityKeys, jobLocations } from "./mock";

export type JobLocation = (typeof jobLocations)[number];

export interface Vacancy {
  id: string;
  title: string;
  company: string;
  salaryFrom: number | null;
  salaryTo: number | null;
  negotiable: boolean;
  level: string[];
  jobLocation: JobLocation;
  stack: string[];
  city?: keyof typeof CITIES;
  postedAt: string;
}

const titles = [
  "Frontend Developer",
  "Backend Developer",
  "Fullstack Developer",
];
const companies = ["Acme", "Globex", "Umbrella", "Initech"];
const levels = ["intern", "junior", "middle", "senior"] as const;
const stacks = [
  ["React", "TypeScript"],
  ["Node", "Express"],
  ["Vue", "JavaScript"],
];

export const vacancies: Vacancy[] = Array.from({ length: 200 }, (_, i) => {
  const hasSalary = Math.random() > 0.3;

  return {
    id: (i + 1).toString(),
    title: titles[Math.floor(Math.random() * titles.length)],
    company: companies[Math.floor(Math.random() * companies.length)],
    salaryFrom: hasSalary ? 1000 + Math.floor(Math.random() * 2000) : null,
    salaryTo: hasSalary ? 1000 + Math.floor(Math.random() * 3000) : null,
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
