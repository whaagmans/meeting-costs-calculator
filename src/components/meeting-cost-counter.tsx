'use client';

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
    <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-6 py-3 text-3xl font-semibold text-primary shadow-inner shadow-primary/20">
      <span className="align-middle">$</span>
      <SlotCounter value={wastedAmount.toFixed(2)} />
    </div>
  );
};

export default MeetingCostCounter;
