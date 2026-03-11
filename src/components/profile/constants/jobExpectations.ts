export const CURRENCY_OPTIONS = [
  { id: "USD", value: "USD", label: "USD" },
  { id: "UAH", value: "UAH", label: "UAH" },
  { id: "EUR", value: "EUR", label: "EUR" },
];

export const PERIOD_OPTIONS = [
  { id: "Hour", value: "hour", label: "Per hour" },
  { id: "Month", value: "month", label: "Per month" },
  { id: "Year", value: "year", label: "Per year" },
];

const finalPeriodData = PERIOD_OPTIONS.map((item) => {
  return {
    id: item.value,
    value: item.label,
    label: item.label,
  };
});

export const SALARY_SELECTS = [
  {
    name: "currency" as const,
    data: CURRENCY_OPTIONS,
    menuKey: "currency" as const,
    defaultLabel: "USD",
  },
  {
    name: "period" as const,
    data: finalPeriodData,
    menuKey: "period" as const,
    defaultLabel: "Per month",
  },
];
