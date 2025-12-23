import { Vacancy } from "./types";

export const SALARY_RULES = {
  USD: { hour: { min: 5, range: 30 }, month: { min: 1000, range: 4000 } },
  UAH: {
    hour: { min: 150, range: 500 },
    month: { min: 20000, range: 80000 },
  },
  EUR: { hour: { min: 6, range: 30 }, month: { min: 1100, range: 4500 } },
};

const EXCHANGE_RATE = {
  USD: 41.5,
  EUR: 44.2,
  UAH: 1,
};

const US_UAH = 41.5;
const H_IN_M = 168;

export const getSalaryInUah = (
  vacancy: Vacancy,
  targetPeriod: "hour" | "month"
) => {
  if (!vacancy.salaryFrom) return 0;

  let baseAmount = vacancy.salaryFrom;

  if (vacancy.currency === "USD") {
    baseAmount *= US_UAH;
  }

  if (vacancy.salaryPeriod === "hour" && targetPeriod === "month") {
    return baseAmount * H_IN_M;
  }

  if (vacancy.salaryPeriod === "month" && targetPeriod === "hour") {
    return baseAmount / H_IN_M;
  }

  return baseAmount;
};
