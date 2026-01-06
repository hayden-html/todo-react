import { useEffect, useRef, useState } from "react";
import {
  BsArrowClockwise,
  BsArrowUpCircle,
  BsPause,
  BsPauseFill,
  BsPlay,
  BsPlayFill,
  BsRCircle,
} from "react-icons/bs";
import { PiPause } from "react-icons/pi";

// I have been recently learning how to use the useRef hook
// This is a replica of the docs example
function Button({ onClick, classes, children }) {
  return (
    <button
      className={classes + " bg-white rounded-4xl text-black p-4"}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default function Timer() {
  const [startTime, setStartTime] = useState<number | null>(null);
  const [now, setNow] = useState<number | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<number | null>(null);
  const [timeElapsed, setTimeElapsed] = useState<number>(0.0);

  const [laps, setLaps] = useState<number[] | null>(null);

  function startTimer() {
    setStartTime(Date.now() - timeElapsed * 1000);
    setNow(Date.now());
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => setNow(Date.now()), 10);
    setIsRunning(true);
  }

  function stopTimer() {
    clearInterval(intervalRef.current);
    const currentElapsed = (Date.now() - startTime) / 1000;
    setTimeElapsed(currentElapsed);
    setIsRunning(false);
  }

  function resetTimer() {
    stopTimer();

    setStartTime(null);
    setNow(null);
    setLaps(null);
    setTimeElapsed(0);
  }

  let timePassed = timeElapsed / 1000;

  if (startTime != null && now != null) {
    timePassed = (now - startTime) / 1000;
  }

  function setLap() {
    const lapSetTime = Date.now();
    const newLap = (lapSetTime - startTime) / 1000;

    const appendedLaps = laps == null ? [newLap] : [...laps, newLap];
    setLaps(appendedLaps);
  }

  function deleteLap(index) {
    setLaps((prev) => {
      return prev?.filter((lap, i) => i !== index);
    });
  }

  return (
    <div className="text-white px-4">
      <h2 className="text-3xl text-center py-8">
        {timePassed?.toFixed(timePassed == 0 ? 0 : 3)}
      </h2>
      <div className="flex gap-4 mb-4">
        {isRunning ? (
          <Button onClick={stopTimer}>
            <BsPauseFill />
          </Button>
        ) : (
          <Button onClick={startTimer}>
            <BsPlayFill />
          </Button>
        )}

        {isRunning ? (
          <Button onClick={setLap}>Set Lap</Button>
        ) : (
          <Button onClick={resetTimer}>
            <BsArrowClockwise />
          </Button>
        )}
      </div>
      <ol>
        {laps?.map((lap, index) => (
          <li key={index} className="flex justify-between">
            <span>{lap}</span>
            <button onClick={() => deleteLap(index)}>x</button>
          </li>
        ))}
      </ol>
    </div>
  );
}
