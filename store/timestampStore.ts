import { Time } from "@/utils/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type TimestampStore = {
  timestamp: [Date, Time];
  setTimestamp: (time: Time) => void;
};

export const useTimestampStore = create(
  persist<TimestampStore>(
    (set) => ({
      timestamp: [new Date(), { hours: 0, minutes: 0, seconds: 0 }],
      setTimestamp: (time) => {
        const now = new Date();
        set({ timestamp: [now, time] });
      },
    }),
    {
      name: "focustime-timestamp-store",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
