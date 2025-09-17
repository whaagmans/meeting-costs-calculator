'use client';

import { useCallback, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import MeetingDashboard from '@/components/meeting-dashboard';
import { StopwatchProvider } from '@/components/useStopwatch';
import HomeScreen from '@/components/home-screen';

type AppView = 'home' | 'dashboard';

const viewVariants = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -24 },
};

export default function Home() {
  const [view, setView] = useState<AppView>('home');
  const [activeRoom, setActiveRoom] = useState<string | null>(null);

  const goToDashboard = useCallback(() => {
    setView('dashboard');
  }, []);

  const handleJoinRoom = useCallback((roomCode: string) => {
    setActiveRoom(roomCode);
    setView('dashboard');
  }, []);

  const handleExit = useCallback(() => {
    setActiveRoom(null);
    setView('home');
  }, []);

  return (
    <main className="relative min-h-screen overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.2),transparent_55%)]" />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_bottom,_rgba(59,130,246,0.15),transparent_60%)]" />
      <StopwatchProvider>
        <AnimatePresence mode="wait">
          {view === 'home' ? (
            <motion.div
              key="home"
              variants={viewVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.35, ease: 'easeOut' }}
            >
              <HomeScreen onStartMeeting={goToDashboard} onJoinRoom={handleJoinRoom} />
            </motion.div>
          ) : (
            <motion.div
              key="dashboard"
              variants={viewVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.35, ease: 'easeOut' }}
            >
              <MeetingDashboard onExit={handleExit} roomCode={activeRoom} />
            </motion.div>
          )}
        </AnimatePresence>
      </StopwatchProvider>
    </main>
  );
}
