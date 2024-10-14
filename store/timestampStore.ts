import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type TimestampStore = {
  timestamp: Date;
  setTimestamp: () => void;
};

export const useTimestampStore = create(
  persist<TimestampStore>(
    (set) => ({
      timestamp: new Date(),
      setTimestamp: () => set({ timestamp: new Date() }),
    }),
    {
      name: "focustime-timestamp-store",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
