'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { User } from '@/interfaces/user';

const UserViewCard = ({ user }: { user: User }) => {
const UserViewCard = ({
  user,
  editUser,
}: {
  user: User;
  editUser: Function;
}) => {
  const { name, amount, payVariant, hoursWorkedPerWeek, isPayHidden } = user;
  const { timeElapsed } = useStopwatch();
  const [moneyWasted, setMoneyWasted] = useState<number>(0);
  const payPerSecond = salaryPerSecond(amount, payVariant, hoursWorkedPerWeek);

  useEffect(() => {
    setMoneyWasted((timeElapsed / 1000) * payPerSecond);
  }, [payPerSecond, timeElapsed]);

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
