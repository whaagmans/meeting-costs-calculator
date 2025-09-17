'use client';

import { User } from '@/interfaces/user';
import { salaryPerSecond } from '@/lib/calcuate-salary';
import { useEffect, useMemo, useState } from 'react';
import SlotCounter from 'react-slot-counter';
import { useStopwatch } from './useStopwatch';
import { motion } from 'framer-motion';

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
  const [isPopping, setIsPopping] = useState(false);

  const totalPayRatePerSecond = Number(calculateTotalSalaryPerSecond(users));

  useEffect(() => {
    setWastedAmount((timeElapsed / 1000) * totalPayRatePerSecond);
  }, [timeElapsed, totalPayRatePerSecond]);

  const formattedAmount = useMemo(
    () => wastedAmount.toFixed(2),
    [wastedAmount],
  );

  useEffect(() => {
    if (timeElapsed <= 0 || users.length === 0) {
      return;
    }
    setIsPopping(true);
    const timeout = setTimeout(() => setIsPopping(false), 240);
    return () => clearTimeout(timeout);
  }, [formattedAmount, timeElapsed, users.length]);

  return (
    <motion.div
      className="flex items-center gap-2 rounded-full border border-primary/30 bg-background/80 px-8 py-4 text-4xl font-semibold text-primary shadow-2xl backdrop-blur"
      animate={
        isPopping
          ? { scale: [1, 1.05, 1], transition: { duration: 0.45, ease: 'easeOut' } }
          : { scale: 1, transition: { duration: 0.3 } }
      }
    >
      <span className="align-middle">$</span>
      <SlotCounter value={formattedAmount} />
    </motion.div>
  );
};

export default MeetingCostCounter;
