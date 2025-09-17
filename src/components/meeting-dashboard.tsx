
'use client';

import type { User } from '@/interfaces/user';
import type { Form } from '@/types/form';
import { AnimatePresence, motion } from 'framer-motion';
import { UserPlus } from 'lucide-react';
import { useMemo, useState } from 'react';
import MeetingCostCounter from './meeting-cost-counter';
import { Stopwatch } from './stopwatch';
import { Button } from './ui/button';
import UserInputCard from './user-cards/user-input-card';
import UserViewCard from './user-cards/user-view-card';
import { useStopwatch } from './useStopwatch';

const floatingVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const MeetingDashboard = ({ roomCode }: { roomCode?: string }) => {
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

  const meetingCtaLabel = useMemo(() => {
    if (hasMeetingStarted) {
      return 'Stop';
    }
    if (timeElapsed <= 0) {
      return 'Start';
    }
    return 'Resume';
  }, [hasMeetingStarted, timeElapsed]);

  const showMetrics = hasMeetingStarted || timeElapsed > 0;

  return (
    <div className="relative flex flex-col">
      <AnimatePresence>
        {showMetrics && (
          <motion.div
            className="pointer-events-none absolute inset-x-0 top-6 z-10 flex flex-col items-center gap-6"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={floatingVariants}
            transition={{ duration: 0.35 }}
          >
            <div className="pointer-events-auto">
              <Stopwatch />
            </div>
            <motion.div
              className="pointer-events-auto"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <MeetingCostCounter users={users} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {!users.length && (
        <motion.div
          className="mx-auto mt-14 max-w-2xl rounded-3xl border border-dashed border-border/50 bg-background/70 px-6 py-5 text-center text-muted-foreground shadow-sm backdrop-blur"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          Add your teammates to see the live meeting timer and cost tracker spring to life.
        </motion.div>
      )}

      <div className="relative z-0 mx-auto flex w-full max-w-6xl flex-wrap justify-center gap-6 px-4 pb-44 pt-28">
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
              whileHover={{ y: -6 }}
            >
              <UserViewCard user={user} editUser={editUser} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {(users.length > 0 || !hasMeetingStarted) && (
          <motion.div
            className="fixed inset-x-0 bottom-10 z-20 flex flex-wrap items-center justify-center gap-4 px-4"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.3 }}
          >
            <AnimatePresence>
              {users.length > 0 && (
                <motion.div
                  key="meeting-toggle"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 12 }}
                >
                  <Button
                    size={'lg'}
                    variant={!hasMeetingStarted ? 'default' : 'destructive'}
                    onClick={toggleEditMode}
                  >
                    {meetingCtaLabel}
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>

            {!hasMeetingStarted && (
              <>
                <AnimatePresence>
                  {timeElapsed > 0 && (
                    <motion.div
                      key="reset"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 12 }}
                    >
                      <Button variant={'destructive'} size={'lg'} onClick={reset}>
                        Reset
                      </Button>
                    </motion.div>
                  )}
                </AnimatePresence>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 12 }}
                >
                  <Button
                    size={'lg'}
                    variant={'success'}
                    disabled={hasMeetingStarted}
                    onClick={() => addForm()}
                  >
                    <UserPlus className="mr-2 h-5 w-5" />
                    Add user
                  </Button>
                </motion.div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {roomCode && (
        <motion.div
          className="pointer-events-none fixed right-4 top-32 z-20 hidden max-w-xs rounded-3xl border border-primary/20 bg-primary/10 px-4 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-primary shadow-lg backdrop-blur sm:flex"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.45, delay: 0.3 }}
        >
          Connected to room {roomCode}
        </motion.div>
      )}
    </div>
  );
};
export default MeetingDashboard;
