export const JOB_LEVELS = ["intern", "junior", "middle", "senior"] as const;

export const JOB_LOCATIONS = ["remote", "office", "hybrid"] as const;

export const FILTER_JOB_LOCATIONS = [
  { value: "any", label: "Any Location", requiresLocation: false },
  { value: "remote", label: "Remote", requiresLocation: false },
  { value: "hybrid", label: "Hybrid", requiresLocation: false },
  { value: "near", label: "Near Me", requiresLocation: true },
] as const;

export const FILTER_POSTING_DATES = [
  { value: "any", label: "Any Time" },
  { value: "24h", label: "Past 24 Hours" },
  { value: "3d", label: "Past 3 Days" },
  { value: "7d", label: "Past Week" },
] as const;

export const FILTER_SALARY_PERIODS = [
  { value: "hour", label: "Per Hour" },
  { value: "month", label: "Per Month" },
] as const;

export const FILTER_JOB_EXPERIENCE = [
  { value: "any", label: "Any" },
  ...JOB_LEVELS.map((level) => ({
    value: level,
    label: level.charAt(0).toUpperCase() + level.slice(1),
  })),
] as const;

export const MOCK_TITLES = [
  "Frontend Developer",
  "Backend Developer",
  "Fullstack Developer",
] as const;
