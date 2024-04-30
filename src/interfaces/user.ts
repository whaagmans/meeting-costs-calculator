import { PayVariant } from '@/enums/PayVariant';

export interface User {
  id: string;
  name: string;
  payVariant: PayVariant;
  amount: number;
  isPayHidden: boolean;
}
