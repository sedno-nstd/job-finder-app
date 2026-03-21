import { create } from "zustand";
import { persist } from "zustand/middleware";

interface IHystoryItem {
  profession: string;
  region: string;
}

interface Props {
  profession: string;
  region: string;
  options: IHystoryItem[];
  setOptions: (item: Partial<IHystoryItem>) => void;
  clear: () => void;
}
export const useUserHistory = create<Props>()(
  persist(
    (set) => ({
      profession: "",
      region: "",
      options: [],
      setOptions: (obj) =>
        set((state) => {
          const profession = obj.profession ?? state.profession;
          const region = obj.region ?? state.region;

          const emptyData = !profession.trim() && !region.trim();
          const dublicateOpt = state.options.some(
            (item) =>
              item.profession === obj.profession && item.region === obj.region,
          );

          if (dublicateOpt || emptyData) return state;

          const newItem = { profession, region };

          return {
            ...state,
            options: [newItem, ...state.options].slice(0, 10),
            profession: profession || "",
            region: region || "",
          };
        }),
      clear: () => set({ options: [] }),
    }),
    {
      name: "history-storage",
    },
  ),
);
