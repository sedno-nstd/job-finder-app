import { JobLocation } from "../types";

type TabType = JobLocation | "any";

export const getJobLocationStyles = (tab: TabType) => {
  switch (tab) {
    case "office":
      return {
        container: "bg-green-50 text-green-700 border-green-200",
      };
    case "remote":
      return {
        container: "bg-orange-50 text-orange-700 border-orange-200",
      };
    case "hybrid":
      return {
        container: "bg-blue-50 text-blue-700 border-blue-200",
      };
    default:
      return {
        container: "bg-gray-100 text-gray-600 border-gray-200",
      };
  }
};
