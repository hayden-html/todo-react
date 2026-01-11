import { useRef, useState } from "react";
import { BsArrowClockwise, BsPauseFill, BsPlayFill } from "react-icons/bs";

// I have been recently learning how to use the useRef hook
// This is a replica of the docs example
function Button({
  onClick,
  classes,
  children,
}: {
  onClick: () => void;
  classes: string;
  children: string | React.ReactNode;
}) {
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
  const [startTime, setStartTime] = useState<number>(0);
  const [now, setNow] = useState<number>(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<number>(0);
  const [timeElapsed, setTimeElapsed] = useState<number>(0.0);

  const [laps, setLaps] = useState<number[]>([]);

  function startTimer() {
    setStartTime(Date.now() - timeElapsed * 1000);
    setNow(Date.now());
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => setNow(Date.now()), 10);
    setIsRunning(true);
  }

  function stopTimer() {
    clearInterval(intervalRef.current);
    const currentElapsed = startTime && (Date.now() - startTime) / 1000;
    if (currentElapsed) setTimeElapsed(currentElapsed);
    setIsRunning(false);
  }

  function resetTimer() {
    stopTimer();

    setStartTime(0);
    setNow(0);
    setLaps([]);
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

  function deleteLap(index: number) {
    const updatedLaps = laps.filter((_, i) => i !== index);
    setLaps(updatedLaps);
  }

  return (
    <div className="text-white px-4">
      <h2 className="text-3xl text-center py-8">
        {timePassed?.toFixed(timePassed == 0 ? 0 : 3)}
      </h2>
      <div className="flex gap-4 mb-4">
        {isRunning ? (
          <Button onClick={stopTimer} classes="">
            <BsPauseFill />
          </Button>
        ) : (
          <Button onClick={startTimer} classes="">
            <BsPlayFill />
          </Button>
        )}

        {isRunning ? (
          <Button onClick={setLap} classes="">
            Set Lap
          </Button>
        ) : (
          <Button onClick={resetTimer} classes="">
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
