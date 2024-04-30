import { User } from '@/interfaces/user';
import { PayVariant } from '../enums/PayVariant';
import { randomUUID } from 'crypto';
import { randomNameGenerator } from '@/lib/generate-random-username';

export const createUser = (
  id: string = randomUUID(),
  name: string = randomNameGenerator(),
  payVariant: PayVariant = PayVariant.MONTH,
  amount: number = 0,
): User => {
  return {
    id,
    name,
    payVariant,
    amount: parseFloat(amount.toFixed(2)), // ensures amount has two decimal places
  };
};