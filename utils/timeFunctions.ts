import { useTimestampStore } from "@/stores/timestampStore";
import { Time } from "./types";
import { differenceInSeconds } from "date-fns";

const formatTimeFragment = (time: number) => time.toString().padStart(2, "0");

export const formatTime = ({ hours, minutes, seconds }: Time) =>
  `${formatTimeFragment(hours)} : ${formatTimeFragment(
    minutes
  )} : ${formatTimeFragment(seconds)}`;

// function to add two times together
export const addTime = (defaultTime: Time, addedTime: Time): Time => {
  const { hours, minutes, seconds } = defaultTime;
  let newSeconds = seconds + addedTime.seconds;
  let newMinutes = minutes + addedTime.minutes;
  let newHours = hours + addedTime.hours;

  if (newSeconds >= 60) {
    newSeconds -= 60;
    newMinutes += 1;
  }
  if (newMinutes >= 60) {
    newMinutes -= 60;
    newHours += 1;
  }

  return { hours: newHours, minutes: newMinutes, seconds: newSeconds };
};

// function to increment time by 1 second
export const tickTime = (previousTime: Time) => {
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

export const formatDate = (date: Date) => {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
};

export const setTimeFromBackground = (
  currentTimer: Time,
  setTimer: (time: Time) => void
) => {
  const timestamp = useTimestampStore.getState().timestamp;
  const now = new Date();

  const totalSecondsDiff = differenceInSeconds(now, timestamp);
  const hoursDiff = Math.floor(totalSecondsDiff / 3600);
  const minutesDiff = Math.floor((totalSecondsDiff % 3600) / 60);
  const secondsDiff = totalSecondsDiff % 60;

  setTimer(
    addTime(currentTimer, {
      hours: hoursDiff,
      minutes: minutesDiff,
      seconds: secondsDiff,
    })
  );
};
