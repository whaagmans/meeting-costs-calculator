'use client';

import { Duration } from 'luxon';
import { useStopwatch } from './useStopwatch';

export const Stopwatch = () => {
  const { timeElapsed } = useStopwatch();
  return (
    <div className="items-center text-4xl font-bold">
      {Duration.fromMillis(timeElapsed).toFormat('hh:mm:ss')}
    </div>
  );
};
