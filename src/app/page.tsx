'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import HomeScreen from '@/components/home-screen';
import MeetingDashboard from '@/components/meeting-dashboard';
import RoomJoinForm from '@/components/room-join-form';
import { StopwatchProvider } from '@/components/useStopwatch';

type AppView = 'home' | 'join-room' | 'dashboard';

export default function Home() {
  const [view, setView] = useState<AppView>('home');
  const [activeRoom, setActiveRoom] = useState<{
    code: string;
    name?: string;
  } | null>(null);

  const handleStartNewSession = () => {
    setActiveRoom(null);
    setView('dashboard');
  };

  const handleJoinSuccess = (details: { code: string; name?: string }) => {
    setActiveRoom(details);
    setView('dashboard');
  };

  const handleExitDashboard = () => {
    setView('home');
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900">
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-60">
        <div className="absolute left-1/2 top-10 h-72 w-[48rem] -translate-x-1/2 rounded-full bg-emerald-500/30 blur-3xl" />
        <div className="absolute left-1/4 top-1/3 h-60 w-[36rem] -translate-x-1/2 rounded-full bg-sky-500/20 blur-3xl" />
        <div className="absolute right-1/4 bottom-12 h-52 w-[32rem] translate-x-1/3 rounded-full bg-indigo-500/20 blur-3xl" />
      </div>
      <AnimatePresence mode="wait">
        {view === 'home' && (
          <motion.div key="home-view" className="relative z-10">
            <HomeScreen
              onStart={handleStartNewSession}
              onJoinRoom={() => setView('join-room')}
            />
          </motion.div>
        )}
        {view === 'join-room' && (
          <motion.div key="join-view" className="relative z-10">
            <RoomJoinForm
              onCancel={() => setView('home')}
              onSuccess={handleJoinSuccess}
            />
          </motion.div>
        )}
        {view === 'dashboard' && (
          <motion.div
            key="dashboard-view"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
            className="relative z-10"
          >
            <StopwatchProvider>
              <MeetingDashboard
                onExit={handleExitDashboard}
                roomDetails={activeRoom ?? undefined}
              />
            </StopwatchProvider>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
