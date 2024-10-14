import { useTimestampStore } from "@/store/timestampStore";
import { setTimeFromBackground } from "./functions";

jest.mock("@/store/timestampStore");

describe("setTimeFromBackground", () => {
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
