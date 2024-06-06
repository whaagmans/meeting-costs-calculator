'use client';

import { User } from '@/interfaces/user';
import { salaryPerSecond } from '@/lib/calcuate-salary';
import { useEffect, useState } from 'react';
import SlotCounter from 'react-slot-counter';

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
  const [wastedAmount, setWastedAmount] = useState<number>(0);

  const totalPayRatePerSecond = Number(calculateTotalSalaryPerSecond(users));

  useEffect(() => {
    const countWastedAmountInterval = setInterval(() => {
      setWastedAmount((prevAmount) => prevAmount + totalPayRatePerSecond);
    }, 1000);
    return () => clearInterval(countWastedAmountInterval);
  }, [wastedAmount, totalPayRatePerSecond]);
  return (
    <div className="text-4xl py-4 px-6 flex items-center">
      <span className="align-middle">$</span>
      <SlotCounter value={wastedAmount.toFixed(2)} />
    </div>
  );
};

export default MeetingCostCounter;
