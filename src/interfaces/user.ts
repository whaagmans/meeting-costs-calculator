import { PayVariant } from '@/enums/PayVariant';

export interface User {
  id: string;
  name: string;
  payVariant: PayVariant;
  hoursWorkedPerWeek: number;
  amount: number;
  isPayHidden: boolean;
}
