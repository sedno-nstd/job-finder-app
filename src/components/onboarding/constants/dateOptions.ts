export const DayInMonth = Array.from({ length: 31 }, (_, i) =>
  String(i + 1).padStart(2, "0")
);

export const CURRENT_YEAR = new Date().getFullYear();

const START_YEAR = CURRENT_YEAR - 16;
const END_YEAR = CURRENT_YEAR - 60;

export const USER_AGES = Array.from(
  { length: START_YEAR - END_YEAR + 1 },
  (_, i) => String(START_YEAR - i)
);

export const MONTHS = [
  { label: "January", value: "01" },
  { label: "February", value: "02" },
  { label: "March", value: "03" },
  { label: "April", value: "04" },
  { label: "May", value: "05" },
  { label: "June", value: "06" },
  { label: "July", value: "07" },
  { label: "August", value: "08" },
  { label: "September", value: "09" },
  { label: "October", value: "10" },
  { label: "November", value: "11" },
  { label: "December", value: "12" },
];
