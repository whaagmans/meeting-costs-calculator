'use client';

import { Duration } from 'luxon';
import { useEffect, useRef, useState } from 'react';

export const Stopwatch = () => {
  const [timeElapsed, setTimeElapsed] = useState<number>(0);
  const startTimeRef = useRef(Date.now());

  useEffect(() => {
    const stopwatchInterval = setInterval(() => {
      setTimeElapsed(Date.now() - startTimeRef.current);
    }, 1000);
    return () => clearInterval(stopwatchInterval);
  }, []);

  return (
    <div className="items-center text-4xl font-bold">
      {Duration.fromMillis(timeElapsed).toFormat('hh:mm:ss')}
    </div>
  );
};
