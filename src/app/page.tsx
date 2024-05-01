'use client';

import UserInputCard from '@/components/user-cards/user-input-card';
import UserViewCard from '@/components/user-cards/user-view-card';
import React, { useState } from 'react';
import type { User } from '@/interfaces/user';
import { Button } from '@/components/ui/button';
import MeetingCostCounter from '@/components/meeting-cost-counter';
import { UserPlus } from 'lucide-react';

export default function Home() {
  const [users, setUsers] = useState<Array<User>>([]);
  const [formKeys, setFormKeys] = useState<string[]>([crypto.randomUUID()]);
  const [hasMeetingStarted, setHasMeetingStarted] = useState<boolean>(false);

  const addUser = (user: User): void => {
    setUsers((prevUsers) => [user, ...prevUsers]);
  };

  const addForm = (): void => {
    setFormKeys((prevKeys) => [...prevKeys, crypto.randomUUID()]);
  };

  const removeForm = (keyToRemove: string): void => {
    setFormKeys((prevKeys) => prevKeys.filter((key) => key !== keyToRemove));
  };

  const toggleEditMode = () => {
    setHasMeetingStarted(!hasMeetingStarted);
  };

  return (
    <main className="relative">
      {hasMeetingStarted && (
        <div className="absolute inset-x-0 top-1/3 flex justify-center">
          <MeetingCostCounter users={users} />
        </div>
      )}
      <div className="flex min-h-screen items-center align-middle flex-wrap space-x-5 p-6">
        {formKeys.map((key) => (
          <UserInputCard
            key={key}
            formKey={key}
            addUser={addUser}
            removeForm={removeForm}
          />
        ))}
        {users.map((user) => (
          <div key={user.id}>
            <UserViewCard user={user} />
          </div>
        ))}
      </div>
      <div className="fixed bottom-12 inset-x-0 space-x-6 flex justify-center">
        {users.length > 0 && (
          <Button
            size={'lg'}
            variant={!hasMeetingStarted ? 'default' : 'destructive'}
            onClick={toggleEditMode}
          >
            {hasMeetingStarted ? 'Cancel' : 'Start Meeting'}
          </Button>
        )}
        <Button
          size={'lg'}
          variant={'success'}
          disabled={hasMeetingStarted}
          onClick={addForm}
        >
          <UserPlus className="mr-2 h-5 w-5" />
          Add user
        </Button>
      </div>
    </main>
  );
}
