import { BreakIntervalOption, TimerState } from "@/utils/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type FocusStore = {
  timerState: TimerState;
  setTimerState: (state: TimerState) => void;
  focusSubject: string;
  setFocusSubject: (subject: string) => void;
  breakInterval: BreakIntervalOption;
  setBreakInterval: (interval: BreakIntervalOption) => void;
};

export const useFocusStore = create(
  persist<FocusStore>(
    (set) => ({
      timerState: TimerState.IDLE,
      setTimerState: (state) => set({ timerState: state }),
      focusSubject: "",
      setFocusSubject: (subject) => set({ focusSubject: subject.trim() }),
      breakInterval: { interval: 15, currentNotificationId: "" },
      setBreakInterval: (interval) => set({ breakInterval: interval }),
    }),
    {
      name: "focustime-focus-store",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
