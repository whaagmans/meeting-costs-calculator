'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { User } from '@/interfaces/user';
import { salaryPerSecond } from '@/lib/calcuate-salary';
import { useEffect, useState } from 'react';
import { useStopwatch } from '@/components/useStopwatch';
import SlotCounter from 'react-slot-counter';
import { Button } from '../ui/button';
import { Pencil } from 'lucide-react';

const UserViewCard = ({
  user,
  editUser,
}: {
  user: User;
  editUser: Function;
}) => {
  const { name, amount, payVariant, hoursWorkedPerWeek, isPayHidden } = user;
  const { timeElapsed, isRunning } = useStopwatch();
  const [moneyWasted, setMoneyWasted] = useState<number>(0);
  const payPerSecond = salaryPerSecond(amount, payVariant, hoursWorkedPerWeek);

  useEffect(() => {
    setMoneyWasted((timeElapsed / 1000) * payPerSecond);
  }, [payPerSecond, timeElapsed]);

  return (
    <Card className="w-[350px] transform rounded-3xl border border-white/10 bg-slate-900/80 text-white shadow-xl shadow-slate-950/40 transition-transform duration-300 hover:-translate-y-1">
      <div className="flex justify-between">
        <CardHeader>
          <CardTitle className="text-xl">{name}</CardTitle>
        </CardHeader>
        <Button
          className={`mt-2 mr-2 shrink-0 text-white transition-transform hover:-translate-y-0.5 ${isRunning ? 'hidden' : ''}`}
          aria-label="edit user information"
          variant={'ghost'}
          disabled={isRunning}
          size={'icon'}
          onClick={() => editUser(user)}
        >
          <Pencil className="h-4 w-4" />
        </Button>
      </div>

      <CardContent>
        <div className="grid w-full items-center gap-4">
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="pay">Your money</Label>
            <h2 id="pay" className="text-xl">
              {!isPayHidden ? `$${amount} ${payVariant}` : 'Hidden'}
            </h2>
            <div className="mt-2 flex items-baseline gap-1 rounded-2xl border border-emerald-400/30 bg-emerald-500/10 px-3 py-2 text-lg text-emerald-100 shadow-inner">
              <span>Cost:</span>
              <span className="text-2xl font-semibold">$</span>
              <SlotCounter value={moneyWasted.toFixed(2)} />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserViewCard;
