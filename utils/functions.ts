import { Time } from "./types";

const formatTimeFragment = (time: number) => time.toString().padStart(2, "0");

export const formatTime = ({ hours, minutes, seconds }: Time) =>
  `${formatTimeFragment(hours)} : ${formatTimeFragment(
    minutes
  )} : ${formatTimeFragment(seconds)}`;

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

export const formatDate = (date: Date) => {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
};
