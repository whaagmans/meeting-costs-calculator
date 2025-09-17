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
    <div className="flex flex-col gap-2 text-emerald-100">
      <p className="text-sm uppercase tracking-[0.4em] text-emerald-200/80">
        Live meeting cost
      </p>
      <div className="flex items-center gap-3 text-4xl font-semibold">
        <span className="align-middle text-5xl">$</span>
        <SlotCounter value={wastedAmount.toFixed(2)} />
      </div>
      <p className="text-sm text-emerald-100/70">
        Keep conversations intentional and celebrate time saved.
      </p>
    </div>
  );
};

export default MeetingCostCounter;
