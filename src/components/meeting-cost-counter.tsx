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
    <div className="text-4xl py-4 px-6 flex items-center">
      <span className="align-middle">$</span>
      <SlotCounter value={wastedAmount.toFixed(2)} />
    </div>
  );
};

export default MeetingCostCounter;
