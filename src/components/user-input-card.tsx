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
import { PayVariant } from '@/enums/PayVariant';
import { createUser } from '@/factory/user-factory';
import { X } from 'lucide-react';
import { useState } from 'react';

const UserInputCard = ({
  formKey,
  addUser,
  removeForm,
}: {
  formKey: string;
  addUser: Function;
  removeForm: Function;
}) => {
  const [name, setName] = useState<string>();
  const [variant, setVariant] = useState<PayVariant>(PayVariant.MONTH);
  const [amount, setAmount] = useState<number>();

  const handleAddUser = () => {
    const id = crypto.randomUUID();
    const newUser = createUser(id, name, variant, amount);
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
            <div className="flex space-x-1.5">
              <div>
                <Label htmlFor="payVariant">Pay iteration</Label>
                <Select
                  onValueChange={(e) => setVariant(e as PayVariant)}
                  defaultValue={variant}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select a variant" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {Object.values(PayVariant).map((payVariant) => (
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
                  onChange={(e) => setAmount(Number(e.target.value))}
                />
              </div>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button onClick={handleAddUser}>Add</Button>
      </CardFooter>
    </Card>
  );
};

export default UserInputCard;
