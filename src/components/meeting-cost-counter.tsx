'use client';

import { PayVariant } from '@/enums/PayVariant';
import { User } from '@/interfaces/user';
import { useEffect, useState } from 'react';
import SlotCounter from 'react-slot-counter';

const calculatePayRatePerSecond = (users: User[]) => {
  const MONTHS_PER_YEAR = 12;
  const SECONDS_PER_HOUR = 3600;
  let totalPayPerSecond = 0;
  users.forEach((user) => {
    const workedHoursPerMonth = user.hoursWorkedPerWeek * 4;
    switch (user.payVariant) {
      case PayVariant.HOUR: {
        totalPayPerSecond += user.amount / SECONDS_PER_HOUR;
        break;
      }
      case PayVariant.MONTH: {
        totalPayPerSecond +=
          user.amount / workedHoursPerMonth / SECONDS_PER_HOUR;
        break;
      }
      case PayVariant.YEAR: {
        const workedHoursPerYear = workedHoursPerMonth * MONTHS_PER_YEAR;
        totalPayPerSecond +=
          user.amount / workedHoursPerYear / SECONDS_PER_HOUR;
        break;
      }
    }
  });
  return totalPayPerSecond;
};

const MeetingCostCounter = ({ users }: { users: User[] }) => {
  const [wastedAmount, setWastedAmount] = useState<number>(0);

  const totalPayRatePerSecond = Number(calculatePayRatePerSecond(users));

  useEffect(() => {
    const countWastedAmountInterval = setInterval(() => {
      setWastedAmount((prevAmount) => prevAmount + totalPayRatePerSecond);
    }, 1000);
    return () => clearInterval(countWastedAmountInterval);
  }, [wastedAmount, totalPayRatePerSecond]);
  return (
    <div>
      <SlotCounter value={wastedAmount.toFixed(2)} />
    </div>
  );
};

export default MeetingCostCounter;
