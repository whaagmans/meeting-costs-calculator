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
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, RefreshCcw } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MeetingDashboardProps {
  onExit?: () => void;
  roomCode?: string | null;
}

const MeetingDashboard = ({ onExit, roomCode }: MeetingDashboardProps) => {
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
        className="min-w-[120px] transition-transform hover:-translate-y-0.5"
      >
        {text}
      </Button>
    );
  };

  return (
    <div className="relative min-h-screen">
      <div className="sticky top-0 flex items-center justify-between px-6 py-4 backdrop-blur-lg bg-background/70 border-b border-primary/10 z-20">
        <div className="flex items-center gap-2">
          {onExit && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onExit}
              className="transition-transform hover:-translate-x-1"
            >
              <ChevronLeft className="mr-2 h-4 w-4" />
              Home
            </Button>
          )}
          <span className="text-sm uppercase tracking-[0.25em] text-primary/70 hidden sm:inline">
            Live meeting tracker
          </span>
        </div>
        <div className="flex items-center gap-3">
          {roomCode && (
            <motion.span
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-primary"
            >
              Room {roomCode}
            </motion.span>
          )}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          >
            <Stopwatch />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut', delay: 0.1 }}
          >
            <MeetingCostCounter users={users} />
          </motion.div>
        </div>
      </div>

      <div className="flex flex-wrap items-start justify-center gap-6 px-6 pb-36 pt-10">
        <AnimatePresence>
          {forms.map((form) => (
            <motion.div
              key={form.key}
              layout
              initial={{ opacity: 0, scale: 0.95, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -12 }}
              transition={{ duration: 0.25 }}
            >
              <UserInputCard
                formKey={form.key}
                addUser={addUser}
                removeForm={removeForm}
                user={form.user}
              />
            </motion.div>
          ))}
        </AnimatePresence>

        <AnimatePresence>
          {users.map((user) => (
            <motion.div
              key={user.id}
              layout
              initial={{ opacity: 0, scale: 0.95, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -12 }}
              transition={{ duration: 0.25 }}
            >
              <UserViewCard user={user} editUser={editUser} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="fixed bottom-8 inset-x-0 flex flex-wrap items-center justify-center gap-4 px-6">
        {users.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {renderStopStartMeetingButton()}
          </motion.div>
        )}

        {!hasMeetingStarted && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.05 }}
            className="flex flex-wrap justify-center gap-3"
          >
            <Button
              className={cn('transition-all', timeElapsed > 0 ? 'opacity-100' : 'hidden')}
              variant={'destructive'}
              size={'lg'}
              onClick={reset}
            >
              <RefreshCcw className="mr-2 h-4 w-4" />
              Reset
            </Button>
            <Button
              className={hasMeetingStarted ? 'hidden' : 'transition-transform hover:-translate-y-0.5'}
              size={'lg'}
              variant={'success'}
              disabled={hasMeetingStarted}
              onClick={() => addForm()}
            >
              <UserPlus className="mr-2 h-5 w-5" />
              Add user
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
};
export default MeetingDashboard;
