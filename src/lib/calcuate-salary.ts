import { PayVariant } from '@/enums/PayVariant';

export const salaryPerSecond = (
  amount: number,
  payVariant: PayVariant,
  workedHoursPerWeek: number,
): number => {
  const MONTHS_PER_YEAR = 12;
  const SECONDS_PER_HOUR = 3600;
  const workedHoursPerMonth = workedHoursPerWeek * 4;
  switch (payVariant) {
    case PayVariant.HOUR: {
      return amount / SECONDS_PER_HOUR;
    }
    case PayVariant.MONTH: {
      return amount / workedHoursPerMonth / SECONDS_PER_HOUR;
    }
    case PayVariant.YEAR: {
      const workedHoursPerYear = workedHoursPerMonth * MONTHS_PER_YEAR;
      return amount / workedHoursPerYear / SECONDS_PER_HOUR;
    }
  }
};
