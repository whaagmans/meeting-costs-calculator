'use client';

import type { User } from '@/interfaces/user';
import type { Form } from '@/types/form';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, Sparkles, UserPlus, Users } from 'lucide-react';
import { useMemo, useState } from 'react';
import MeetingCostCounter from './meeting-cost-counter';
import { Stopwatch } from './stopwatch';
import { Button } from './ui/button';
import UserInputCard from './user-cards/user-input-card';
import UserViewCard from './user-cards/user-view-card';
import { useStopwatch } from './useStopwatch';

const MotionButton = motion(Button);

interface MeetingDashboardProps {
  roomDetails?: {
    code: string;
    name?: string;
  };
  onExit?: () => void;
}

const MeetingDashboard = ({ roomDetails, onExit }: MeetingDashboardProps) => {
  const { pause, start, reset, isRunning, timeElapsed } = useStopwatch();
  const [users, setUsers] = useState<Array<User>>([]);
  const [forms, setForms] = useState<Form[]>([{ key: crypto.randomUUID() }]);
  const [hasMeetingStarted, setHasMeetingStarted] = useState<boolean>(false);

  const activeRoomTitle = useMemo(() => {
    if (!roomDetails?.name) {
      return hasMeetingStarted
        ? 'Your meeting is live'
        : 'Prepare your next meeting';
    }
    return hasMeetingStarted
      ? `${roomDetails.name} is live`
      : `Getting ready for ${roomDetails.name}`;
  }, [hasMeetingStarted, roomDetails]);

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
      <MotionButton
        size={'lg'}
        variant={!hasMeetingStarted ? 'default' : 'destructive'}
        onClick={toggleEditMode}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.96 }}
      >
        {text}
      </MotionButton>
    );
  };

  return (
    <div className="relative flex min-h-screen flex-col pb-32 text-white">
      <motion.header
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="mx-auto w-full max-w-6xl px-6 pt-24"
      >
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur">
          <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br from-white/10 via-transparent to-emerald-500/10" />
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="space-y-2">
              <p className="flex items-center gap-2 text-sm font-medium uppercase tracking-[0.3em] text-white/60">
                <Sparkles className="h-4 w-4" />
                {roomDetails ? `Room ${roomDetails.code}` : 'New live session'}
              </p>
              <h2 className="text-3xl font-semibold text-white sm:text-4xl">
                {activeRoomTitle}
              </h2>
              <p className="max-w-xl text-sm text-white/60">
                Add everyone who joined your meeting and watch the live timer and cost
                tracker respond instantly.
              </p>
            </div>
            <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center">
              <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm text-white/80">
                <Users className="h-4 w-4" />
                {users.length} attendee{users.length === 1 ? '' : 's'}
              </div>
              {onExit && (
                <MotionButton
                  variant="ghost"
                  className="text-white hover:bg-white/10"
                  onClick={onExit}
                  whileHover={{ x: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" /> Back home
                </MotionButton>
              )}
            </div>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="rounded-2xl border border-white/10 bg-black/20 p-6 backdrop-blur"
            >
              <Stopwatch />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
              className="rounded-2xl border border-white/10 bg-black/20 p-6 backdrop-blur"
            >
              <MeetingCostCounter users={users} />
            </motion.div>
          </div>
        </div>
      </motion.header>

      <section className="mx-auto w-full max-w-6xl flex-1 px-6 py-12">
        <motion.div
          layout
          className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3"
          transition={{ layout: { duration: 0.4, ease: 'easeInOut' } }}
        >
          <AnimatePresence initial={false}>
            {forms.map((form) => (
              <UserInputCard
                key={form.key}
                formKey={form.key}
                addUser={addUser}
                removeForm={removeForm}
                user={form.user}
              />
            ))}
          </AnimatePresence>
          <AnimatePresence initial={false}>
            {users.map((user) => (
              <UserViewCard key={user.id} user={user} editUser={editUser} />
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      <AnimatePresence>
        {(users.length > 0 || !hasMeetingStarted) && (
          <motion.div
            key="controls"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-8 left-1/2 z-30 w-[calc(100%-3rem)] max-w-3xl -translate-x-1/2 rounded-full border border-white/10 bg-white/10 p-4 shadow-2xl backdrop-blur"
          >
            <div className="flex flex-wrap items-center justify-center gap-3">
              {users.length > 0 && renderStopStartMeetingButton()}
              {!hasMeetingStarted && (
                <>
                  {timeElapsed > 0 && (
                    <MotionButton
                      variant={'destructive'}
                      size={'lg'}
                      onClick={reset}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.96 }}
                    >
                      Reset
                    </MotionButton>
                  )}
                  <MotionButton
                    size={'lg'}
                    variant={'success'}
                    disabled={hasMeetingStarted}
                    onClick={() => addForm()}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.96 }}
                  >
                    <UserPlus className="mr-2 h-5 w-5" />
                    Add user
                  </MotionButton>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
export default MeetingDashboard;
