'use client';

import type { User } from '@/interfaces/user';
import type { Form } from '@/types/form';
import { UserPlus } from 'lucide-react';
import { useState } from 'react';
import MeetingCostCounter from './meeting-cost-counter';
import { Stopwatch } from './stopwatch';
import { Button } from './ui/button';
import UserInputCard from './user-cards/user-input-card';
import UserViewCard from './user-cards/user-view-card';
import { useStopwatch } from './useStopwatch';

const MeetingDashboard = () => {
  const { pause, start, reset, isRunning, timeElapsed } = useStopwatch();
  const [users, setUsers] = useState<Array<User>>([]);
  const [forms, setForms] = useState<Form[]>([{ key: crypto.randomUUID() }]);
  const [hasMeetingStarted, setHasMeetingStarted] = useState<boolean>(false);

  const addUser = (user: User): void => {
    setUsers((prevUsers) => [user, ...prevUsers]);
  };

  const removeUser = (userId: string): void => {
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
  };

  const editUser = (user: User): void => {
    addForm(user);
    removeUser(user.id);
  };

  const addForm = (user?: User): void => {
    setForms((prevForms) => [...prevForms, { key: crypto.randomUUID(), user }]);
  };

  const removeForm = (keyToRemove: string): void => {
    setForms((prevForms) =>
      prevForms.filter((form) => form.key !== keyToRemove),
    );
  };

  const toggleEditMode = () => {
    if (!isRunning) {
      start();
    } else {
      pause();
    }
    setHasMeetingStarted(!hasMeetingStarted);
  };

  const renderStopStartMeetingButton = () => {
    let text;
    if (hasMeetingStarted) {
      text = 'Stop';
    } else if (timeElapsed <= 0) {
      text = 'Start';
    } else {
      text = 'Resume';
    }
    return (
      <Button
        size={'lg'}
        variant={!hasMeetingStarted ? 'default' : 'destructive'}
        onClick={toggleEditMode}
      >
        {text}
      </Button>
    );
  };

  return (
    <div>
      {(hasMeetingStarted || timeElapsed > 0) && (
        <div>
          <div className="absolute inset-x-0 flex justify-center mt-10">
            <Stopwatch />
          </div>
          <div className="absolute inset-x-0 top-1/3 flex justify-center">
            <MeetingCostCounter users={users} />
          </div>
        </div>
      )}
      <div className="flex min-h-screen items-center align-middle flex-wrap space-x-5 p-6">
        {forms.map((form) => (
          <UserInputCard
            key={form.key}
            formKey={form.key}
            addUser={addUser}
            removeForm={removeForm}
            user={form.user}
          />
        ))}
        {users.map((user) => (
          <div key={user.id}>
            <UserViewCard user={user} editUser={editUser} />
          </div>
        ))}
      </div>
      <div className="fixed bottom-12 inset-x-0 space-x-6 flex justify-center">
        {users.length > 0 && renderStopStartMeetingButton()}
        {!hasMeetingStarted && (
          <>
            <Button
              className={timeElapsed > 0 ? '' : 'hidden'}
              variant={'destructive'}
              size={'lg'}
              onClick={reset}
            >
              Reset
            </Button>
            <Button
              className={hasMeetingStarted ? 'hidden' : ''}
              size={'lg'}
              variant={'success'}
              disabled={hasMeetingStarted}
              onClick={() => addForm()}
            >
              <UserPlus className="mr-2 h-5 w-5" />
              Add user
            </Button>
          </>
        )}
      </div>
    </div>
  );
};
export default MeetingDashboard;
