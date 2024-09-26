import { TimerState } from "@/utils/types";
import { create } from "zustand";

type FocusStore = {
  timerState: TimerState;
  setTimerState: (state: TimerState) => void;
};

export const useFocusStore = create<FocusStore>((set) => ({
  timerState: TimerState.IDLE,
  setTimerState: (state) => set({ timerState: state }),
}));
