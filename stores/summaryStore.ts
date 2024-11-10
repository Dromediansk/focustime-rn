import AsyncStorage from "@react-native-async-storage/async-storage";
import { persist, createJSONStorage } from "zustand/middleware";
import { addTime } from "@/utils/timeFunctions";
import { SummaryItem } from "@/utils/types";
import { create } from "zustand";

type SummaryStore = {
  summary: SummaryItem[];
  addSummaryItem: (summary: SummaryItem) => void;
  clearSummary: () => void;
};

const handleAddSummaryItem = (state: SummaryStore, item: SummaryItem) => {
  const existingItemIndex = state.summary.findIndex(
    (i) => i.title.trim().toLowerCase() === item.title.trim().toLowerCase()
  );

  if (existingItemIndex !== -1) {
    const existingItem = state.summary[existingItemIndex];
    existingItem.timer = addTime(existingItem.timer, item.timer);
    return { summary: state.summary };
  }

  return { summary: [...state.summary, item] };
};

export const useSummaryStore = create(
  persist<SummaryStore>(
    (set) => ({
      summary: [],
      addSummaryItem: (item) =>
        set((state) => handleAddSummaryItem(state, item)),
      clearSummary: () => {
        set({ summary: [] });
      },
    }),
    {
      name: "focustime-summary-store",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
