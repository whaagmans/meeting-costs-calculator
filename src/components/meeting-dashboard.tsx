'use client';

import type { User } from '@/interfaces/user';
import type { Form } from '@/types/form';
import { ArrowLeft, UserPlus } from 'lucide-react';
import { useMemo, useState } from 'react';
import MeetingCostCounter from './meeting-cost-counter';
import { Stopwatch } from './stopwatch';
import { Button } from './ui/button';
import UserInputCard from './user-cards/user-input-card';
import UserViewCard from './user-cards/user-view-card';
import { useStopwatch } from './useStopwatch';

const MeetingDashboard = ({
  onLeaveMeeting,
  roomCode,
}: {
  onLeaveMeeting?: () => void;
  roomCode?: string;
}) => {
  const { pause, start, reset, isRunning, timeElapsed } = useStopwatch();
  const [users, setUsers] = useState<Array<User>>([]);
  const [forms, setForms] = useState<Form[]>([{ key: crypto.randomUUID() }]);
  const [hasMeetingStarted, setHasMeetingStarted] = useState<boolean>(false);

  const isMeetingActive = useMemo(
    () => hasMeetingStarted || timeElapsed > 0,
    [hasMeetingStarted, timeElapsed],
  );

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
        className="shadow-lg transition-transform duration-300 hover:-translate-y-0.5"
        variant={!hasMeetingStarted ? 'default' : 'destructive'}
        onClick={toggleEditMode}
      >
        {text}
      </Button>
    );
  };

  return (
    <div className="relative mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-16 px-6 py-16 text-white">
      <header className="flex flex-col items-center justify-between gap-6 rounded-3xl border border-white/10 bg-white/10 px-6 py-8 text-center shadow-2xl shadow-slate-950/40 backdrop-blur lg:flex-row lg:text-left">
        <div className="space-y-2">
          <p className="text-sm uppercase tracking-[0.4em] text-fuchsia-200">
            {roomCode ? `Room • ${roomCode}` : 'Personal session'}
          </p>
          <h2 className="text-3xl font-semibold">Your live meeting control center</h2>
          <p className="text-sm text-slate-200/80">
            Add attendees, start the timer, and watch the live meeting cost update in real time.
          </p>
        </div>
        <div className="flex flex-col items-center gap-3 sm:flex-row">
          {onLeaveMeeting && (
            <Button
              variant="secondary"
              size="lg"
              className="w-full justify-center gap-2 border border-white/20 bg-white/10 text-white shadow-lg shadow-slate-950/40 transition-transform duration-300 hover:-translate-y-0.5 hover:bg-white/20 sm:w-auto"
              onClick={onLeaveMeeting}
            >
              <ArrowLeft className="h-5 w-5" />
              Return home
            </Button>
          )}
          {users.length > 0 && renderStopStartMeetingButton()}
          {!hasMeetingStarted && timeElapsed > 0 && (
            <Button
              className="shadow-lg transition-transform duration-300 hover:-translate-y-0.5"
              variant={'destructive'}
              size={'lg'}
              onClick={reset}
            >
              Reset
            </Button>
          )}
        </div>
      </header>

      {isMeetingActive && (
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-8 shadow-2xl shadow-slate-950/40 backdrop-blur-xl animate-in fade-in slide-in-from-left-4">
            <Stopwatch />
          </div>
          <div className="rounded-3xl border border-emerald-400/40 bg-emerald-500/10 p-8 text-emerald-100 shadow-2xl shadow-emerald-900/50 backdrop-blur-xl animate-in fade-in slide-in-from-right-4">
            <MeetingCostCounter users={users} />
          </div>
        </div>
      )}

      <div className="flex flex-wrap items-start justify-center gap-6">
        {forms.map((form) => (
          <div key={form.key} className="animate-in fade-in slide-in-from-bottom-4">
            <UserInputCard
              formKey={form.key}
              addUser={addUser}
              removeForm={removeForm}
              user={form.user}
            />
          </div>
        ))}
        {users.map((user) => (
          <div key={user.id} className="animate-in fade-in slide-in-from-bottom-4">
            <UserViewCard user={user} editUser={editUser} />
          </div>
        ))}
        {!hasMeetingStarted && (
          <Button
            size={'lg'}
            variant={'success'}
            className="h-[90px] w-[350px] rounded-3xl border border-emerald-400/30 bg-emerald-500/10 text-lg text-emerald-100 shadow-lg shadow-emerald-900/50 transition-transform duration-300 hover:-translate-y-1"
            onClick={() => addForm()}
          >
            <UserPlus className="mr-3 h-6 w-6" />
            Add another attendee
          </Button>
        )}
      </div>
    </div>
  );
};
export default MeetingDashboard;
