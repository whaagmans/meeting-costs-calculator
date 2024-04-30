'use client';

import UserInputCard from '@/components/user-cards/user-input-card';
import UserViewCard from '@/components/user-cards/user-view-card';
import React, { useState } from 'react';
import type { User } from '@/interfaces/user';
import { Button } from '@/components/ui/button';
import MeetingCostCounter from '@/components/meeting-cost-counter';

export default function Home() {
  const [users, setUsers] = useState<Array<User>>([]);
  const [formKeys, setFormKeys] = useState<string[]>([crypto.randomUUID()]);
  const [hasMeetingStarted, setHasMeetingStarted] = useState<boolean>(false);

  const addUser = (user: User): void => {
    setUsers((prevUsers) => [...prevUsers, user]);
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
    <main>
      {hasMeetingStarted && <MeetingCostCounter users={users} />}
      <div className="flex min-h-screen items-center align-middle flex-wrap justify-between p-6">
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
        <Button onClick={addForm}>Add</Button>
      </div>
      {users.length > 0 && (
        <div className="fixed bottom-12 inset-x-0 flex justify-center">
          <Button
            size={'lg'}
            variant={!hasMeetingStarted ? 'default' : 'destructive'}
            onClick={toggleEditMode}
          >
            {hasMeetingStarted ? 'Cancel' : 'Start Meeting'}
          </Button>
        </div>
      )}
    </main>
  );
}
