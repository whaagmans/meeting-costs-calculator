import { User } from '@/interfaces/user';
import { PaymentInterval } from '../enums/PaymentInterval';
import { randomUUID } from 'crypto';
import { randomNameGenerator } from '@/lib/generate-random-username';

export const createUser = (
  id: string = randomUUID(),
  name: string = '',
  payVariant: PaymentInterval = PaymentInterval.MONTH,
  hoursWorkedPerWeek: number = 40,
  amount: number = 0,
  isPayHidden: boolean = false,
): User => {
  if (!name) {
    name = randomNameGenerator();
  }
  return {
    id,
    name,
    payVariant,
    hoursWorkedPerWeek,
    amount: parseFloat(amount.toFixed(2)), // ensures amount has two decimal places
    isPayHidden,
  };
};
