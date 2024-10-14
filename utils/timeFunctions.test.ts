import { useTimestampStore } from "@/store/timestampStore";
import {
  addTime,
  formatTime,
  setTimeFromBackground,
  tickTime,
} from "./timeFunctions";

describe("addTime", () => {
  it("should add two times together", () => {
    const defaultTime = { hours: 1, minutes: 30, seconds: 45 };
    const addedTime = { hours: 2, minutes: 15, seconds: 15 };

    const result = addTime(defaultTime, addedTime);

    expect(result).toEqual({ hours: 3, minutes: 46, seconds: 0 });
  });

  it("should add two times together and carry over", () => {
    const defaultTime = { hours: 1, minutes: 30, seconds: 45 };
    const addedTime = { hours: 2, minutes: 30, seconds: 45 };

    const result = addTime(defaultTime, addedTime);

    expect(result).toEqual({ hours: 4, minutes: 1, seconds: 30 });
  });
});

describe("tickTime", () => {
  it("should increment time by 1 second", () => {
    const previousTime = { hours: 1, minutes: 30, seconds: 45 };

    const result = tickTime(previousTime);

    expect(result).toEqual({ hours: 1, minutes: 30, seconds: 46 });
  });

  it("should increment time by 1 second and carry over", () => {
    const previousTime = { hours: 1, minutes: 30, seconds: 59 };

    const result = tickTime(previousTime);

    expect(result).toEqual({ hours: 1, minutes: 31, seconds: 0 });
  });

  it("should increment time by 1 second and carry over minutes and hours", () => {
    const previousTime = { hours: 1, minutes: 59, seconds: 59 };

    const result = tickTime(previousTime);

    expect(result).toEqual({ hours: 2, minutes: 0, seconds: 0 });
  });

  it("should increment time by 1 second and carry over hours", () => {
    const previousTime = { hours: 23, minutes: 59, seconds: 59 };

    const result = tickTime(previousTime);

    expect(result).toEqual({ hours: 24, minutes: 0, seconds: 0 });
  });
});

describe("setTimeFromBackground", () => {
  jest.mock("@/store/timestampStore");
  const mockGetState = jest.fn();

  beforeEach(() => {
    useTimestampStore.getState = mockGetState;
  });

  it("should handle zero time difference", () => {
    jest.useFakeTimers().setSystemTime(new Date("2025-01-01T00:00:00"));

    const setCurrentTimer = jest.fn();
    const currentTimer = { hours: 0, minutes: 0, seconds: 0 };

    const timestamp = new Date();
    mockGetState.mockReturnValue({ timestamp });

    setTimeFromBackground(currentTimer, setCurrentTimer);

    expect(setCurrentTimer).toHaveBeenCalledWith({
      hours: 0,
      minutes: 0,
      seconds: 0,
    });
  });

  it("should add time difference of 10 seconds", () => {
    jest.useFakeTimers().setSystemTime(new Date("2025-01-01T00:00:10"));

    const setCurrentTimer = jest.fn();
    const currentTimer = { hours: 0, minutes: 0, seconds: 0 };

    const timestamp = new Date("2025-01-01T00:00:00");
    mockGetState.mockReturnValue({ timestamp });

    setTimeFromBackground(currentTimer, setCurrentTimer);

    expect(setCurrentTimer).toHaveBeenCalledWith({
      hours: 0,
      minutes: 0,
      seconds: 10,
    });
  });

  it("should add time difference of 1 minute", () => {
    jest.useFakeTimers().setSystemTime(new Date("2025-01-01T00:01:00"));

    const setCurrentTimer = jest.fn();
    const currentTimer = { hours: 0, minutes: 0, seconds: 0 };

    const timestamp = new Date("2025-01-01T00:00:00");
    mockGetState.mockReturnValue({ timestamp });

    setTimeFromBackground(currentTimer, setCurrentTimer);

    expect(setCurrentTimer).toHaveBeenCalledWith({
      hours: 0,
      minutes: 1,
      seconds: 0,
    });
  });

  it("should add time difference of 1 hour", () => {
    jest.useFakeTimers().setSystemTime(new Date("2025-01-01T01:00:00"));

    const setCurrentTimer = jest.fn();
    const currentTimer = { hours: 0, minutes: 0, seconds: 0 };

    const timestamp = new Date("2025-01-01T00:00:00");
    mockGetState.mockReturnValue({ timestamp });

    setTimeFromBackground(currentTimer, setCurrentTimer);

    expect(setCurrentTimer).toHaveBeenCalledWith({
      hours: 1,
      minutes: 0,
      seconds: 0,
    });
  });

  it("should add time difference of 3 hours, 25 minutes, and 34 seconds", () => {
    jest.useFakeTimers().setSystemTime(new Date("2025-01-01T03:25:34"));

    const setCurrentTimer = jest.fn();
    const currentTimer = { hours: 0, minutes: 0, seconds: 0 };

    const timestamp = new Date("2025-01-01T00:00:00");
    mockGetState.mockReturnValue({ timestamp });

    setTimeFromBackground(currentTimer, setCurrentTimer);

    expect(setCurrentTimer).toHaveBeenCalledWith({
      hours: 3,
      minutes: 25,
      seconds: 34,
    });
  });
});

describe("formatTime", () => {
  it("should format time correctly", () => {
    const time = { hours: 1, minutes: 30, seconds: 45 };

    const result = formatTime(time);

    expect(result).toBe("01 : 30 : 45");
  });

  it("should format time correctly with single digit values", () => {
    const time = { hours: 0, minutes: 0, seconds: 1 };

    const result = formatTime(time);

    expect(result).toBe("00 : 00 : 01");
  });
});
