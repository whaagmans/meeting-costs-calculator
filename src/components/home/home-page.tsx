'use client';

import { motion } from 'framer-motion';

import HomeHero from './home-hero';
import FeatureHighlights from './feature-highlights';
import RoomJoinForm from './room-join-form';
import { ModeToggle } from '@/components/theme-toggle';

const HomePage = () => {
  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.15),_transparent_55%)]" />
        <motion.div
          className="absolute -top-1/2 left-1/2 h-[40rem] w-[40rem] -translate-x-1/2 rounded-full bg-primary/20 blur-3xl"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 40, ease: 'linear' }}
        />
        <div className="absolute inset-x-0 bottom-0 h-96 bg-gradient-to-t from-background via-background/60 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-6xl flex-col px-6 pb-24 pt-10 sm:px-8">
        <header className="flex items-center justify-between gap-4">
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col"
          >
            <span className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">
              Meeting costs calculator
            </span>
            <h2 className="text-xl font-semibold">Wasted on meetings</h2>
          </motion.div>
          <ModeToggle />
        </header>

        <main className="flex-1">
          <HomeHero />
          <FeatureHighlights />
          <RoomJoinForm />
        </main>
      </div>
    </div>
  );
};

export default HomePage;
