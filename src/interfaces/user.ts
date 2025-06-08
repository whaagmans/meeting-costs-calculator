import { PaymentInterval } from '@/enums/PaymentInterval';

export interface User {
  id: string;
  name: string;
  payVariant: PaymentInterval;
  hoursWorkedPerWeek: number;
  amount: number;
  isPayHidden: boolean;
}
