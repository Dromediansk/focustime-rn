import AsyncStorage from "@react-native-async-storage/async-storage";
import { persist, createJSONStorage } from "zustand/middleware";
import { addTime } from "@/utils/functions";
import { SummaryItem } from "@/utils/types";
import { create } from "zustand";

type SummaryStore = {
  summary: SummaryItem[];
  addSummaryItem: (summary: SummaryItem) => void;
  clearSummary: () => void;
};

export const useSummaryStore = create(
  persist<SummaryStore>(
    (set) => ({
      summary: [],
      addSummaryItem: (item) =>
        set((state) => {
          const existingItemIndex = state.summary.findIndex(
            (i) => i.title === item.title
          );

          if (existingItemIndex !== -1) {
            const existingItem = state.summary[existingItemIndex];
            existingItem.time = addTime(existingItem.time, item.time);
            return { summary: state.summary };
          }

          return { summary: [...state.summary, item] };
        }),
      clearSummary: () => set({ summary: [] }),
    }),
    {
      name: "focustime-summary-store",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
