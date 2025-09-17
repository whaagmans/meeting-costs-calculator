'use client';

import HomeScreen from '@/components/home-screen';
import MeetingDashboard from '@/components/meeting-dashboard';
import { StopwatchProvider } from '@/components/useStopwatch';
import { useCallback, useMemo, useState } from 'react';

type ActiveView = 'home' | 'meeting';

export default function Home() {
  const [view, setView] = useState<ActiveView>('home');
  const [roomCode, setRoomCode] = useState<string | undefined>(undefined);

  const handleEnterMeeting = useCallback((code?: string) => {
    setRoomCode(code);
    setView('meeting');
  }, []);

  const handleLeaveMeeting = useCallback(() => {
    setRoomCode(undefined);
    setView('home');
  }, []);

  const isHomeScreenVisible = useMemo(() => view === 'home', [view]);

  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950">
      <div className="pointer-events-none absolute -top-40 left-20 h-72 w-72 rounded-full bg-fuchsia-500/40 blur-3xl animate-pulse-slow" />
      <div className="pointer-events-none absolute bottom-10 right-10 h-96 w-96 rounded-full bg-indigo-500/30 blur-3xl animate-float" />
      <div className="pointer-events-none absolute -bottom-32 left-0 h-64 w-64 rounded-full bg-emerald-500/20 blur-3xl animate-pulse-slow" />
      <section className="relative z-10">
        {isHomeScreenVisible ? (
          <HomeScreen onEnterMeeting={handleEnterMeeting} />
        ) : (
          <div className="animate-in fade-in duration-500">
            <StopwatchProvider>
              <MeetingDashboard onLeaveMeeting={handleLeaveMeeting} roomCode={roomCode} />
            </StopwatchProvider>
          </div>
        )}
      </section>
    </main>
  );
}
