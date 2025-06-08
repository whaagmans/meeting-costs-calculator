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
import { X } from 'lucide-react';
import { useState } from 'react';
import { Switch } from '../ui/switch';
import { Separator } from '../ui/separator';
import { User } from '@/interfaces/user';

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
    user?.payVariant || PaymentInterval.MONTH
  );
  const [hoursWorkedPerWeek, setHoursWorkedPerWeek] = useState<string>(
    user?.hoursWorkedPerWeek.toString() || '40'
  );
  const [amount, setAmount] = useState<string>(user?.amount.toString() || '');
  const [isPayHidden, setIsPayHidden] = useState<boolean>(
    user?.isPayHidden || false
  );

  const handleAddUser = () => {
    const id = crypto.randomUUID();
    const newUser = createUser(
      id,
      name,
      variant,
      Number(hoursWorkedPerWeek),
      Number(amount),
      isPayHidden
    );
    addUser(newUser);
    removeForm(formKey);
  };

  return (
    <Card className="w-[350px] my-5">
      <div className="flex justify-around">
        <CardHeader>
          <CardTitle>Add meeting attender</CardTitle>
        </CardHeader>
        <Button
          onClick={() => removeForm(formKey)}
          className="shrink-0 mt-2 mr-2"
          aria-label="Remove form"
          variant={'ghost'}
          size={'icon'}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                maxLength={100}
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name of the attendee"
              />
            </div>
            <Separator />
            <div className="flex space-x-1.5">
              <div>
                <Label
                  id="pay-iteration-label"
                  htmlFor="payVariant"
                  aria-label="Pay iteration"
                >
                  Pay iteration
                </Label>
                <Select
                  onValueChange={(e) => setVariant(e as PaymentInterval)}
                  defaultValue={variant}
                >
                  <SelectTrigger
                    className="w-[180px]"
                    aria-labelledby="pay-iteration-label"
                  >
                    <SelectValue placeholder="Select a variant" />
                  </SelectTrigger>
                  <SelectContent>
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
              <div>
                <Label htmlFor="payVariant">Pay amount</Label>
                <Input
                  type="number"
                  id="amount"
                  placeholder="e.g. 18"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
            </div>
            <div className="flex space-x-5">
              <div>
                <Label htmlFor="hoursWorked">Hours worked per week</Label>
                <Input
                  id="hoursWorked"
                  type="number"
                  value={hoursWorkedPerWeek}
                  onChange={(e) => setHoursWorkedPerWeek(e.target.value)}
                  placeholder="e.g. 36"
                />
              </div>
              <div className="items-center">
                <Label
                  id="hide-pay-label"
                  aria-label="Hide pay"
                  htmlFor="hide-pay"
                >
                  Hide pay
                </Label>
                <Switch
                  id="hide-pay"
                  aria-labelledby="hide-pay-label"
                  className="mt-2 ml-0 text-right"
                  checked={isPayHidden}
                  onCheckedChange={() => setIsPayHidden(!isPayHidden)}
                />
              </div>
            </div>
            <Separator />
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={() => removeForm(formKey)}>
          Cancel
        </Button>
        <Button onClick={handleAddUser}>Add</Button>
      </CardFooter>
    </Card>
  );
};

export default UserInputCard;
