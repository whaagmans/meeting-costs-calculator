'use client';

import { motion } from 'framer-motion';
import { User } from '@/interfaces/user';
import { salaryPerSecond } from '@/lib/calcuate-salary';
import { useEffect, useState } from 'react';
import SlotCounter from 'react-slot-counter';
import { useStopwatch } from './useStopwatch';

const calculateTotalSalaryPerSecond = (users: User[]) => {
  let totalPayPerSecond = 0;
  users.forEach((user) => {
    totalPayPerSecond += salaryPerSecond(
      user.amount,
      user.payVariant,
      user.hoursWorkedPerWeek,
    );
  });
  return totalPayPerSecond;
};

const MeetingCostCounter = ({ users }: { users: User[] }) => {
  const { timeElapsed } = useStopwatch();
  const [wastedAmount, setWastedAmount] = useState<number>(0);

  const totalPayRatePerSecond = Number(calculateTotalSalaryPerSecond(users));

  useEffect(() => {
    setWastedAmount((timeElapsed / 1000) * totalPayRatePerSecond);
  }, [timeElapsed, totalPayRatePerSecond]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="flex flex-col gap-2 text-white"
    >
      <span className="text-sm uppercase tracking-[0.3em] text-white/60">
        Total meeting cost
      </span>
      <div className="flex items-baseline text-4xl font-semibold">
        <span className="mr-1">$</span>
        <SlotCounter value={wastedAmount.toFixed(2)} />
      </div>
    </motion.div>
  );
};

export default MeetingCostCounter;
