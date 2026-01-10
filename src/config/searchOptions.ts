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

export const POPULAR_PROFESSIONS = [
  "Frontend Developer",
  "Backend Developer",
  "Fullstack Developer",
  "UI/UX Designer",
  "Project Manager",
  "QA Engineer",
  "Sales Manager",
  "Data Scientist",
  "DevOps Engineer",
  "Marketing Specialist",
  "Mobile App Developer",
  "Cloud Architect",
  "Cybersecurity Analyst",
  "Data Analyst",
  "Product Manager",
  "System Administrator",
  "Network Engineer",
  "Database Administrator",
  "Machine Learning Engineer",
  "Technical Writer",
  "Graphic Designer",
  "Motion Designer",
  "3D Artist",
  "Video Editor",
  "Content Creator",
  "HR Manager",
  "Digital Marketing Manager",
  "Doctor",
  "Nurse",
  "Pharmacist",
  "Dentist",
  "Physical Therapist",
  "Accountant",
  "Financial Analyst",
  "Lawyer",
  "Teacher",
  "Professor",
  "Architect",
  "Civil Engineer",
  "Electrician",
] as const;
