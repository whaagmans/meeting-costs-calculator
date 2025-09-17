'use client';

import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

const containerVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};

const HomeHero = () => {
  return (
    <div className="grid items-center gap-12 pb-16 pt-10 md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
      <motion.div
        className="space-y-6"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1 text-sm font-medium text-primary">
          <Sparkles className="h-4 w-4" />
          Smarter meetings start here
        </span>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
          Track meeting costs with clarity and calm.
        </h1>
        <p className="text-lg text-muted-foreground sm:text-xl">
          Bring transparency to every gathering, empower your team to make intentional decisions, and celebrate meetings that stay on budget.
        </p>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <Button asChild size="lg" className="gap-2">
            <Link href="/meeting">
              Launch the meeting room
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Link
            className="text-sm font-semibold text-muted-foreground transition-colors hover:text-primary"
            href="#learn-more"
          >
            Learn how it works
          </Link>
        </div>
      </motion.div>

      <motion.div
        className="relative rounded-3xl border border-border/40 bg-background/60 p-6 shadow-2xl backdrop-blur-sm"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-primary/40 blur-3xl" />
        <div className="absolute -bottom-12 -left-8 h-40 w-40 rounded-full bg-sky-500/20 blur-3xl" />
        <div className="relative space-y-4">
          <p className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
            Live snapshot
          </p>
          <div className="rounded-2xl border border-border/60 bg-gradient-to-br from-background via-background/60 to-muted/40 p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <span className="text-base font-semibold text-muted-foreground">
                Team sync in progress
              </span>
              <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-semibold text-emerald-500">
                On track
              </span>
            </div>
            <div className="mt-6 space-y-4 text-sm">
              <div className="flex items-center justify-between rounded-xl border border-primary/20 bg-primary/10 px-4 py-3 text-primary">
                <span className="font-medium">Elapsed time</span>
                <span className="font-mono text-lg">00:32:08</span>
              </div>
              <div className="flex items-center justify-between rounded-xl border border-amber-400/30 bg-amber-400/10 px-4 py-3 text-amber-500">
                <span className="font-medium">Cost to date</span>
                <span className="font-mono text-lg">$142.32</span>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-xl border border-border/50 bg-background/50 px-4 py-3">
                  <p className="text-xs uppercase text-muted-foreground">Attendees</p>
                  <p className="mt-1 text-lg font-semibold">5 people</p>
                </div>
                <div className="rounded-xl border border-border/50 bg-background/50 px-4 py-3">
                  <p className="text-xs uppercase text-muted-foreground">Cost / minute</p>
                  <p className="mt-1 text-lg font-semibold">$4.45</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default HomeHero;
