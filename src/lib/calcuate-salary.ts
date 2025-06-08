import { PaymentInterval } from '@/enums/PaymentInterval';

export const salaryPerSecond = (
  amount: number,
  payVariant: PaymentInterval,
  workedHoursPerWeek: number,
): number => {
  const MONTHS_PER_YEAR = 12;
  const SECONDS_PER_HOUR = 3600;
  const workedHoursPerMonth = workedHoursPerWeek * 4;
  switch (payVariant) {
    case PaymentInterval.HOUR: {
      return amount / SECONDS_PER_HOUR;
    }
    case PaymentInterval.MONTH: {
      return amount / workedHoursPerMonth / SECONDS_PER_HOUR;
    }
    case PaymentInterval.YEAR: {
      const workedHoursPerYear = workedHoursPerMonth * MONTHS_PER_YEAR;
      return amount / workedHoursPerYear / SECONDS_PER_HOUR;
    }
  }
};
