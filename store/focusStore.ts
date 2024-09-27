import { TimerState } from "@/utils/types";
import { create } from "zustand";

type FocusStore = {
  timerState: TimerState;
  setTimerState: (state: TimerState) => void;
  focusSubject: string;
  setFocusSubject: (subject: string) => void;
};

export const useFocusStore = create<FocusStore>((set) => ({
  timerState: TimerState.IDLE,
  setTimerState: (state) => set({ timerState: state }),
  focusSubject: "",
  setFocusSubject: (subject) => set({ focusSubject: subject }),
}));
