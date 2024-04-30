'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { User } from '@/interfaces/user';

const UserViewCard = ({ user }: { user: User }) => {
  return (
    <Card className="w-[350px] my-5">
      <CardHeader>
        <CardTitle>{user.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="pay">Your money</Label>
              <h2 id="pay" className="text-xl">
                {!user.isPayHidden
                  ? `$${user.amount} ${user.payVariant}`
                  : 'Hidden'}
              </h2>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default UserViewCard;
