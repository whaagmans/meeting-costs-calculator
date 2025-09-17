'use client';

import SlotCounter from 'react-slot-counter';
import { motion } from 'framer-motion';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Pencil } from 'lucide-react';
import { User } from '@/interfaces/user';
import { salaryPerSecond } from '@/lib/calcuate-salary';
import { useEffect, useMemo, useState } from 'react';
import { useStopwatch } from '@/components/useStopwatch';

const MotionButton = motion(Button);

const cardVariants = {
  initial: { opacity: 0, y: 24, scale: 0.96 },
  animate: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.35 } },
  exit: { opacity: 0, y: -16, scale: 0.95, transition: { duration: 0.2 } },
};

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
  const payPerSecond = useMemo(
    () => salaryPerSecond(amount, payVariant, hoursWorkedPerWeek),
    [amount, hoursWorkedPerWeek, payVariant],
  );

  useEffect(() => {
    setMoneyWasted((timeElapsed / 1000) * payPerSecond);
  }, [payPerSecond, timeElapsed]);

  return (
    <motion.div
      layout
      variants={cardVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      whileHover={{ translateY: -6 }}
    >
      <Card className="my-5 w-full border-white/10 bg-white/5 text-white shadow-xl backdrop-blur">
        <div className="flex items-start justify-between">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-white">
              {name}
            </CardTitle>
            <p className="text-sm text-white/60">
              {isPayHidden ? 'Compensation hidden for participants' : 'Compensation visible to everyone'}
            </p>
          </CardHeader>
          <MotionButton
            className={`mt-4 mr-4 shrink-0 text-white hover:bg-white/10 ${isRunning ? 'pointer-events-none opacity-50' : ''}`}
            aria-label="edit user information"
            variant={'ghost'}
            disabled={isRunning}
            size={'icon'}
            whileHover={{ rotate: -3 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => editUser(user)}
          >
            <Pencil className="h-4 w-4" />
          </MotionButton>
        </div>

        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="pay" className="text-white/70">
              Compensation
            </Label>
            <h2 id="pay" className="text-2xl font-medium text-white">
              {!isPayHidden ? `$${amount} ${payVariant}` : 'Hidden'}
            </h2>
            <p className="text-sm text-white/60">
              Based on {hoursWorkedPerWeek} hrs/week •{' '}
              {payPerSecond.toLocaleString(undefined, {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 4,
              })}{' '}
              per second
            </p>
          </div>
          <div className="rounded-2xl border border-emerald-400/40 bg-emerald-400/10 p-4 text-emerald-100">
            <span className="text-sm uppercase tracking-[0.2em] text-emerald-200">
              Cost so far
            </span>
            <div className="mt-1 flex items-baseline gap-2 text-3xl font-semibold">
              <span>$</span>
              <SlotCounter value={moneyWasted.toFixed(2)} />
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default UserViewCard;
