'use client';

import UserInputCard from '@/components/user-input-card';
import UserView from '@/components/user-view';
import React, { useState } from 'react';
import type { User } from '@/interfaces/user';
import { Button } from '@/components/ui/button';

export default function Home() {
  const [users, setUsers] = useState<Array<User>>([]);
  const [formKeys, setFormKeys] = useState<string[]>([crypto.randomUUID()]);
  const [hasMeetingStarted, setHasMeetingStarted] = useState<boolean>(true);

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
            <UserView user={user} />
          </div>
        ))}
        <Button onClick={addForm}>Add</Button>
      </div>
      <div className="fixed bottom-12 inset-x-0 flex justify-center">
        <Button
          size={'lg'}
          variant={!hasMeetingStarted ? 'destructive' : 'highlight'}
          onClick={toggleEditMode}
        >
          {hasMeetingStarted ? 'Start Meeting' : 'Cancel'}
        </Button>
      </div>
    </main>
  );
}
