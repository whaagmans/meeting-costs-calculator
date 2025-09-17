'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { PaymentInterval } from '@/enums/PaymentInterval';
import { createUser } from '@/factory/user-factory';
import { User } from '@/interfaces/user';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { useMemo, useState } from 'react';

const MotionButton = motion(Button);

const cardVariants = {
  initial: { opacity: 0, y: 24, scale: 0.96 },
  animate: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.35 } },
  exit: { opacity: 0, y: -16, scale: 0.95, transition: { duration: 0.2 } },
};

const UserInputCard = ({
  formKey,
  addUser,
  removeForm,
  user,
}: {
  formKey: string;
  addUser: Function;
  removeForm: Function;
  user?: User;
}) => {
  const [name, setName] = useState<string>(user?.name || '');
  const [variant, setVariant] = useState<PaymentInterval>(
    user?.payVariant || PaymentInterval.MONTH,
  );
  const [hoursWorkedPerWeek, setHoursWorkedPerWeek] = useState<string>(
    user?.hoursWorkedPerWeek.toString() || '40',
  );
  const [amount, setAmount] = useState<string>(user?.amount.toString() || '');
  const [isPayHidden, setIsPayHidden] = useState<boolean>(
    user?.isPayHidden || false,
  );

  const isValid = useMemo(() => {
    const numericAmount = Number(amount);
    const numericHours = Number(hoursWorkedPerWeek);
    return (
      name.trim().length > 0 &&
      !Number.isNaN(numericAmount) &&
      numericAmount > 0 &&
      !Number.isNaN(numericHours) &&
      numericHours > 0
    );
  }, [amount, hoursWorkedPerWeek, name]);

  const handleAddUser = () => {
    if (!isValid) return;
    const id = crypto.randomUUID();
    const newUser = createUser(
      id,
      name,
      variant,
      Number(hoursWorkedPerWeek),
      Number(amount),
      isPayHidden,
    );
    addUser(newUser);
    removeForm(formKey);
  };

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
          <CardHeader className="space-y-1">
            <CardTitle className="text-lg">Add meeting attender</CardTitle>
            <p className="text-sm text-white/60">
              Capture attendee details to keep your cost tracking accurate.
            </p>
          </CardHeader>
          <Button
            onClick={() => removeForm(formKey)}
            className="mt-4 mr-4 shrink-0 text-white hover:bg-white/10"
            aria-label="Remove form"
            variant={'ghost'}
            size={'icon'}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        <CardContent>
          <form className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-white/80">
                Name
              </Label>
              <Input
                id="name"
                maxLength={100}
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name of the attendee"
                className="border-white/20 bg-white/10 text-white placeholder:text-white/40"
              />
            </div>
            <Separator className="border-white/10" />
            <div className="flex flex-col gap-4 sm:flex-row">
              <div className="flex-1 space-y-2">
                <Label
                  id={`pay-iteration-label-${formKey}`}
                  htmlFor="payVariant"
                  aria-label="Pay iteration"
                  className="text-white/80"
                >
                  Pay iteration
                </Label>
                <Select
                  onValueChange={(e) => setVariant(e as PaymentInterval)}
                  defaultValue={variant}
                >
                  <SelectTrigger
                    className="w-full border-white/20 bg-white/10 text-white"
                    aria-labelledby={`pay-iteration-label-${formKey}`}
                  >
                    <SelectValue placeholder="Select a variant" />
                  </SelectTrigger>
                  <SelectContent className="border-white/10 bg-slate-900/95 text-white backdrop-blur">
                    <SelectGroup>
                      {Object.values(PaymentInterval).map((payVariant) => (
                        <SelectItem key={payVariant} value={payVariant}>
                          {payVariant}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex-1 space-y-2">
                <Label htmlFor="amount" className="text-white/80">
                  Pay amount
                </Label>
                <Input
                  type="number"
                  id="amount"
                  placeholder="e.g. 18"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="border-white/20 bg-white/10 text-white placeholder:text-white/40"
                />
              </div>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row">
              <div className="flex-1 space-y-2">
                <Label htmlFor="hoursWorked" className="text-white/80">
                  Hours worked per week
                </Label>
                <Input
                  id="hoursWorked"
                  type="number"
                  value={hoursWorkedPerWeek}
                  onChange={(e) => setHoursWorkedPerWeek(e.target.value)}
                  placeholder="e.g. 36"
                  className="border-white/20 bg-white/10 text-white placeholder:text-white/40"
                />
              </div>
              <div className="flex flex-1 flex-col justify-end space-y-2">
                <Label
                  id={`hide-pay-label-${formKey}`}
                  aria-label="Hide pay"
                  htmlFor={`hide-pay-${formKey}`}
                  className="text-white/80"
                >
                  Hide pay
                </Label>
                <div className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 px-3 py-2">
                  <Switch
                    id={`hide-pay-${formKey}`}
                    aria-labelledby={`hide-pay-label-${formKey}`}
                    className="data-[state=checked]:bg-emerald-400"
                    checked={isPayHidden}
                    onCheckedChange={() => setIsPayHidden(!isPayHidden)}
                  />
                  <span className="text-sm text-white/70">
                    {isPayHidden ? 'Hidden for others' : 'Visible to everyone'}
                  </span>
                </div>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex items-center justify-between gap-3">
          <MotionButton
            variant="outline"
            onClick={() => removeForm(formKey)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            className="border-white/30 text-white hover:bg-white/10"
          >
            Cancel
          </MotionButton>
          <MotionButton
            onClick={handleAddUser}
            disabled={!isValid}
            whileHover={{ scale: isValid ? 1.05 : 1 }}
            whileTap={{ scale: isValid ? 0.96 : 1 }}
            className="bg-emerald-400 text-slate-900 hover:bg-emerald-300 disabled:bg-white/30 disabled:text-white/60"
          >
            Add attendee
          </MotionButton>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default UserInputCard;
