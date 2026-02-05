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
          const dublicateOpt = state.options.some(
            (item) =>
              item.profession === obj.profession && item.region === obj.region,
          );

          if (dublicateOpt) {
            return {};
          }

          return {
            ...state,
            options: [obj, ...state.options].slice(0, 10),
            profession: obj.profession || "",
            region: obj.region || "",
          };
        }),
      clear: () => set({ options: [] }),
    }),
    {
      name: "history-storage",
    },
  ),
);
