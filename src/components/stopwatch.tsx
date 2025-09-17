'use client';

import { Duration } from 'luxon';
import { useStopwatch } from './useStopwatch';
import { motion } from 'framer-motion';

export const Stopwatch = () => {
  const { timeElapsed, isRunning } = useStopwatch();

  return (
    <motion.div
      className="flex items-center justify-center rounded-full border border-primary/30 bg-background/80 px-10 py-4 text-4xl font-bold text-primary shadow-xl backdrop-blur"
      variants={{
        hidden: { opacity: 0, y: -12 },
        idle: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4 } },
        running: {
          opacity: 1,
          y: 0,
          scale: [1, 1.05, 1],
          transition: { duration: 2.4, repeat: Infinity, ease: 'easeInOut' },
        },
      }}
      initial="hidden"
      animate={isRunning ? 'running' : 'idle'}
    >
      {Duration.fromMillis(timeElapsed).toFormat('hh:mm:ss')}
    </motion.div>
  );
};
