'use client';

import { motion } from 'framer-motion';
import { Duration } from 'luxon';
import { useStopwatch } from './useStopwatch';

export const Stopwatch = () => {
  const { timeElapsed } = useStopwatch();
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="flex flex-col gap-1 text-white"
    >
      <span className="text-sm uppercase tracking-[0.3em] text-white/60">
        Elapsed time
      </span>
      <span className="text-4xl font-semibold tracking-widest text-white">
        {Duration.fromMillis(timeElapsed).toFormat('hh:mm:ss')}
      </span>
    </motion.div>
  );
};
