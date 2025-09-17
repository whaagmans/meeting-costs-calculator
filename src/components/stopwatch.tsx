'use client';

import { Duration } from 'luxon';
import { useStopwatch } from './useStopwatch';
import { motion } from 'framer-motion';

export const Stopwatch = () => {
  const { timeElapsed } = useStopwatch();
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="inline-flex items-center rounded-full border border-primary/20 bg-background/80 px-5 py-2 text-2xl font-semibold tracking-widest"
    >
      {Duration.fromMillis(timeElapsed).toFormat('hh:mm:ss')}
    </motion.div>
  );
};
