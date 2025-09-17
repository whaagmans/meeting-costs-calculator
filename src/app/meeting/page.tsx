'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

import MeetingDashboard from '@/components/meeting-dashboard';
import { Button } from '@/components/ui/button';
import { StopwatchProvider } from '@/components/useStopwatch';
import { ModeToggle } from '@/components/theme-toggle';

const MeetingPage = () => {
  const searchParams = useSearchParams();
  const roomCode = searchParams.get('room') ?? undefined;

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(129,140,248,0.12),_transparent_55%)]" />
        <motion.div
          className="absolute -left-32 top-24 h-72 w-72 rounded-full bg-primary/20 blur-3xl"
          initial={{ opacity: 0.2 }}
          animate={{ opacity: [0.2, 0.5, 0.2], scale: [1, 1.15, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute -right-20 bottom-10 h-80 w-80 rounded-full bg-sky-500/10 blur-3xl"
          initial={{ opacity: 0.15 }}
          animate={{ opacity: [0.15, 0.4, 0.15], scale: [1, 1.1, 1] }}
          transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        />
      </div>
      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-6xl flex-col px-4 pb-10 pt-6 sm:px-6 lg:px-8">
        <header className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Button asChild variant="ghost" size="sm" className="gap-2">
              <Link href="/">
                <ArrowLeft className="h-4 w-4" />
                Home
              </Link>
            </Button>
            {roomCode && (
              <motion.span
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-primary"
              >
                Room {roomCode}
              </motion.span>
            )}
          </div>
          <ModeToggle />
        </header>
        <main className="flex-1 pb-10 pt-6">
          <StopwatchProvider>
            <MeetingDashboard roomCode={roomCode} />
          </StopwatchProvider>
        </main>
      </div>
    </div>
  );
};

export default MeetingPage;
