import { EmploymentTypeId } from "../mock";

type TabType = EmploymentTypeId | "any";

export const getJobLocationStyles = (tab: TabType) => {
  switch (tab) {
    case "full-time":
      return { container: "bg-green-50 text-green-700 border-green-200" };
    case "part-time":
      return { container: "bg-cyan-50 text-cyan-700 border-cyan-200" };
    case "remote":
      return { container: "bg-orange-50 text-orange-700 border-orange-200" };
    case "contract":
      return { container: "bg-purple-50 text-purple-700 border-purple-200" };
    case "internship":
      return { container: "bg-yellow-50 text-yellow-700 border-yellow-200" };
    default:
      return { container: "bg-gray-100 text-gray-600 border-gray-200" };
  }
};
