import {
  JOB_LEVELS,
  JOB_LOCATIONS,
  FILTER_JOB_LOCATIONS,
  FILTER_POSTING_DATES,
  FILTER_SALARY_PERIODS,
  FILTER_JOB_EXPERIENCE,
} from "./searchOptions";
import { CITIES } from "../domain/geo/cities";

export type JobLevel = (typeof JOB_LEVELS)[number];
export type JobLocationType = (typeof JOB_LOCATIONS)[number];

export type FilterLocation = (typeof FILTER_JOB_LOCATIONS)[number]["value"];
export type FilterPostingDate = (typeof FILTER_POSTING_DATES)[number]["value"];
export type FilterSalaryPeriod =
  (typeof FILTER_SALARY_PERIODS)[number]["value"];
export type FilterLevel = (typeof FILTER_JOB_EXPERIENCE)[number]["value"];

export interface Vacancy {
  id: string;
  title: string;
  company: string;
  description: string;
  salaryFrom: number | null;
  salaryTo: number | null;
  currency: "USD" | "UAH" | "EUR";
  salaryPeriod: "hour" | "month";
  negotiable: boolean;
  level: JobLevel[];
  jobLocation: JobLocationType;
  stack: string[];
  city?: keyof typeof CITIES;
  postedAt: string;
}
type SalaryPeriod = "hour" | "month";
export interface SearchFilters {
  search: string;
  location: FilterLocation;
  postingDate: FilterPostingDate;
  level: FilterLevel | "any";
  geo: "all" | "near";
  salaryPeriod: FilterSalaryPeriod;
  stack: string[];
}
