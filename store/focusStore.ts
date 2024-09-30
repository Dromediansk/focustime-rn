import { Time, TimerState } from "@/utils/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type FocusStore = {
  timerState: TimerState;
  setTimerState: (state: TimerState) => void;
  focusSubject: string;
  setFocusSubject: (subject: string) => void;
  time: Time;
  setTime: (time: Time) => void;
};

export const useFocusStore = create(
  persist<FocusStore>(
    (set) => ({
      timerState: TimerState.IDLE,
      setTimerState: (state) => set({ timerState: state }),
      focusSubject: "",
      setFocusSubject: (subject) => set({ focusSubject: subject }),
      time: {
        hours: 0,
        minutes: 0,
        seconds: 0,
      },
      setTime: (time) => set({ time }),
    }),
    {
      name: "focustime-focus-store",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
