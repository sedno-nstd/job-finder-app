export const DayInMonth = Array.from({ length: 31 }, (_, i) =>
  String(i + 1).padStart(2, "0"),
);

export const CURRENT_YEAR = new Date().getFullYear();

const START_YEAR = CURRENT_YEAR - 16;
const END_YEAR = CURRENT_YEAR - 60;

export const USER_AGES = Array.from(
  { length: START_YEAR - END_YEAR + 1 },
  (_, i) => String(START_YEAR - i),
);

export const MONTHS = [
  { label: "January", id: "01" },
  { label: "February", id: "02" },
  { label: "March", id: "03" },
  { label: "April", id: "04" },
  { label: "May", id: "05" },
  { label: "June", id: "06" },
  { label: "July", id: "07" },
  { label: "August", id: "08" },
  { label: "September", id: "09" },
  { label: "October", id: "10" },
  { label: "November", id: "11" },
  { label: "December", id: "12" },
];
