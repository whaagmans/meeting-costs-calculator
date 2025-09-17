'use client';

import { Duration } from 'luxon';
import { useStopwatch } from './useStopwatch';

export const Stopwatch = () => {
  const { timeElapsed } = useStopwatch();
  return (
    <div className="space-y-3 text-slate-100">
      <p className="text-sm uppercase tracking-[0.4em] text-slate-300">
        Time in meeting
      </p>
      <div className="flex items-center justify-center rounded-2xl border border-white/20 bg-white/10 px-6 py-4 text-5xl font-bold shadow-inner">
        {Duration.fromMillis(timeElapsed).toFormat('hh:mm:ss')}
      </div>
      <p className="text-sm text-slate-300/80">
        Pause to catch your breath or resume when the conversation continues.
      </p>
    </div>
  );
};
