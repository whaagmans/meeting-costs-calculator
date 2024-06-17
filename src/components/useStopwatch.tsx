import {
  type ReactNode,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

interface StopwatchContextType {
  timeElapsed: number;
  isRunning: boolean;
  start: () => void;
  pause: () => void;
  reset: () => void;
}

export const StopwatchContext = createContext<StopwatchContextType | null>(
  null,
);

export const useStopwatch = () => {
  const context = useContext(StopwatchContext);
  if (!context) {
    throw new Error('useStopwatch must be used within a StopwatchProvider');
  }
  return context;
};

export const StopwatchProvider = ({ children }: { children: ReactNode }) => {
  const [timeElapsed, setTimeElapsed] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const startTimeRef = useRef<number | null>(null);
  const accumulatedTimeRef = useRef<number>(0);
  const stopwatchIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isRunning) {
      startTimeRef.current = Date.now();
      stopwatchIntervalRef.current = setInterval(() => {
        setTimeElapsed(
          accumulatedTimeRef.current + (Date.now() - startTimeRef.current!),
        );
      }, 1000);
    } else if (stopwatchIntervalRef.current) {
      clearInterval(stopwatchIntervalRef.current);
    }
    return () => {
      if (stopwatchIntervalRef.current) {
        clearInterval(stopwatchIntervalRef.current);
      }
    };
  }, [isRunning]);

  const start = () => {
    setIsRunning(true);
  };

  const pause = () => {
    if (isRunning) {
      accumulatedTimeRef.current += Date.now() - startTimeRef.current!;
      setIsRunning(false);
    }
  };

  const reset = () => {
    setIsRunning(false);
    setTimeElapsed(0);
    accumulatedTimeRef.current = 0;
    startTimeRef.current = null;
  };

  return (
    <StopwatchContext.Provider
      value={{ timeElapsed, isRunning, start, pause, reset }}
    >
      {children}
    </StopwatchContext.Provider>
  );
};
