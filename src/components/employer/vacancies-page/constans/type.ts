import { SortType } from "@/src/hooks/employer/useVacanciesFilter";

export const sortOptions: { label: string; value: SortType }[] = [
  { label: "newest", value: "latest" },
  { label: "oldest", value: "oldest" },
  { label: "popular", value: "popular" },
  { label: "most applications", value: "most applications" },
];
