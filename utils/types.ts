import { BREAK_INTERVAL_OPTIONS } from "./constants";

export enum TimerState {
  IDLE = "IDLE",
  RUNNING = "RUNNING",
  PAUSED = "PAUSED",
}

export type Time = {
  hours: number;
  minutes: number;
  seconds: number;
};

export type SummaryItem = {
  title: string;
  time: Time;
};

export type BreakIntervalOption = (typeof BREAK_INTERVAL_OPTIONS)[number];
