import { useEffect, useRef, useState, type ChangeEvent } from "react";
import "./App.css";

function App() {
  const [inputMinutes, setInputMinutes] = useState(0);
  const [countdown, setCountdown] = useState<number>(0);
  const [isRunning, setIsRunning] = useState(false);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputMinutes(Number(e.target.value));
  };
  const startTimer = () => {
    // button should work for timer already running or timer count moves to negative
    if (isRunning || inputMinutes <= 0) return;
    setIsRunning(true);
    setCountdown(inputMinutes * 60);

    timerRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          setIsRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };
  const pauseTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      setIsRunning(false);
    }
  };
  const resetTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    setCountdown(0);
    setInputMinutes(0);
    setIsRunning(false);
  };
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg space-y-4">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Counter Timer
        </h1>
        <div className="flex flex-col items-center gap-4">
          <input
            type="number"
            value={inputMinutes}
            onChange={handleChange}
            className="w-40 p-2 text-center text-2xl border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="text-6xl font-bold text-gray-800">
            {Math.floor(countdown / 60)}:
            {String(countdown % 60).padStart(2, "0")}
          </div>
          <div className="flex gap-3">
            <button
              onClick={startTimer}
              className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
            >
              Start
            </button>
            <button
              onClick={pauseTimer}
              className="px-6 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition-colors"
            >
              Pause
            </button>
            <button
              onClick={resetTimer}
              className="px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
