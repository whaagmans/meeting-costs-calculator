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
import { motion } from 'framer-motion';

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
    <Card className="w-[350px] border border-border/40 bg-background/70 shadow-xl backdrop-blur">
      <div className="flex justify-between">
        <CardHeader>
          <CardTitle>{name}</CardTitle>
        </CardHeader>
        <Button
          className={`shrink-0 mt-2 mr-2 transition-opacity ${isRunning ? 'pointer-events-none opacity-0' : 'opacity-100'}`}
          aria-label="edit user information"
          variant={'ghost'}
          disabled={isRunning}
          size={'icon'}
          onClick={() => editUser(user)}
          type="button"
        >
          <Pencil className="h-4 w-4" />
        </Button>
      </div>

      <CardContent>
        <div className="grid w-full items-center gap-4">
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="pay">Your money</Label>
            <h2 id="pay" className="text-xl font-semibold">
              {!isPayHidden ? `$${amount} ${payVariant}` : 'Hidden'}
            </h2>
            <motion.div
              className="flex items-center gap-1 rounded-xl bg-muted/40 px-3 py-2 text-base font-medium"
              animate={
                isRunning
                  ? { scale: [1, 1.04, 1], transition: { duration: 1.8, repeat: Infinity, ease: 'easeInOut' } }
                  : { scale: 1, transition: { duration: 0.3 } }
              }
            >
              <span className="text-sm text-muted-foreground">Cost to date</span>
              <span className="font-semibold">$</span>
              <SlotCounter value={moneyWasted.toFixed(2)} />
            </motion.div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserViewCard;
