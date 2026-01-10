// import { create } from "zustand";
// import { persist } from "zustand/middleware";

export type SalaryPeriod = "hour" | "month";

// interface FilterState {
//   selectedPeriod: SalaryPeriod;
//   setPeriod: (period: SalaryPeriod) => void;
//   minSalary: number;
//   setMinSalary: (amount: number) => void;
// }

// export const useFilterStore = create<FilterState>()(
//   persist(
//     (set) => ({
//       selectedPeriod: "month",
//       minSalary: 0,
//       setPeriod: (period) => set({ selectedPeriod: period }),
//       setMinSalary: (amount) => set({ minSalary: amount }),
//     }),
//     {
//       name: "salary-storage",
//     }
//   )
// );
