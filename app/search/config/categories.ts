export const JOB_LOCATION_OPTIONS = [
  {
    value: "all",
    label: "Any Location",
  },
  {
    value: "remote",
    label: "Remote",
    requiresLocation: false,
  },
  {
    value: "hybrid",
    label: "Hybrid",
    requiresLocation: false,
  },
  {
    value: "near",
    label: "Near Me",
    requiresLocation: true,
  },
];

export const POSTING_DATE_OPTIONS = [
  { value: "any", label: "Any Time" },
  { value: "24h", label: "Past 24 Hours" },
  { value: "3d", label: "Past 3 Days" },
  { value: "7d", label: "Past Week" },
];

export const SALARY_PAYMENT_PERIODS = [
  { value: "hour", label: "Per Hour" },
  { value: "month", label: "Per Month" },
];

export const JOB_EXPIERENCE = [
  { value: "any", label: "Any" },
  { value: "intern", label: "Intern" },
  { value: "junior", label: "Junior" },
  { value: "middle", label: "Middle" },
  { value: "senior", label: "Senior" },
];
