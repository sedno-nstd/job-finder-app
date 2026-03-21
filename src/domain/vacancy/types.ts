import { EMPLOYMENT_TYPES, jobLocations } from "./mock";

export type EmploymentTypeId = (typeof EMPLOYMENT_TYPES)[number]["id"];
export type JobLocation = (typeof jobLocations)[number];

export const stacks = [
  ["React", "TypeScript", "Next.js", "Vue", "Angular", "Svelte", "JavaScript"],
  [
    "Node.js",
    "Express",
    "NestJS",
    "PostgreSQL",
    "MongoDB",
    "Prisma",
    "Drizzle",
  ],
  ["Docker", "Git", "Nginx", "Firebase", "AWS", "Vercel", "GraphQL"],
  ["React Native", "Flutter", "Electron"],
];
