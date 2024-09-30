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
  clearTime: () => void;
  increaseTime: () => void;
};

export const defaultTime: Time = {
  hours: 0,
  minutes: 0,
  seconds: 0,
};

const increaseTime = (previousTime: Time) => {
  const { hours, minutes, seconds } = previousTime;
  let newSeconds = seconds + 1;
  let newMinutes = minutes;
  let newHours = hours;

  if (newSeconds === 60) {
    newSeconds = 0;
    newMinutes = minutes + 1;
  }
  if (newMinutes === 60) {
    newMinutes = 0;
    newHours = hours + 1;
  }

  return { hours: newHours, minutes: newMinutes, seconds: newSeconds };
};

export const useFocusStore = create(
  persist<FocusStore>(
    (set, get) => ({
      timerState: TimerState.IDLE,
      setTimerState: (state) => set({ timerState: state }),
      focusSubject: "",
      setFocusSubject: (subject) => set({ focusSubject: subject }),
      time: defaultTime,
      clearTime: () => set({ time: defaultTime }),
      increaseTime: () => set({ time: increaseTime(get().time) }),
    }),
    {
      name: "focustime-focus-store",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
