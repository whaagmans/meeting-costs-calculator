'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  CalendarClock,
  ShieldCheck,
  UsersRound,
} from 'lucide-react';

const featureItems = [
  {
    title: 'Track meeting costs in real time',
    description:
      'Bring transparency to every conversation with live salary-based tracking.',
    icon: CalendarClock,
  },
  {
    title: 'Collaborate with your whole team',
    description:
      'Invite teammates, adjust salaries, and keep the numbers visible for everyone.',
    icon: UsersRound,
  },
  {
    title: 'Secure rooms when you need privacy',
    description:
      'Protect sensitive meetings with password-gated rooms and quick prompts.',
    icon: ShieldCheck,
  },
];

interface HomeScreenProps {
  onStart: () => void;
  onJoinRoom: () => void;
}

const containerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.15, duration: 0.6, ease: 'easeOut' },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

const HomeScreen = ({ onStart, onJoinRoom }: HomeScreenProps) => {
  return (
    <div className="flex min-h-screen flex-col justify-between">
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="mx-auto flex w-full max-w-5xl flex-col items-center gap-10 px-6 pt-28 text-center lg:pt-36"
      >
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1 text-sm font-medium text-white backdrop-blur"
        >
          <span className="inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          Live meeting insight
        </motion.div>
        <motion.h1
          className="text-balance text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }}
        >
          Understand the true cost of every meeting in seconds
        </motion.h1>
        <motion.p
          className="max-w-2xl text-lg text-white/80"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
        >
          Meeting Costs Calculator helps teams stay aligned, make fast decisions, and
          keep budgets in check with beautiful, transparent dashboards.
        </motion.p>
        <motion.div
          className="flex flex-col items-center gap-4 sm:flex-row"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3, ease: 'easeOut' }}
        >
          <Button
            size="lg"
            className="group bg-white text-slate-900 hover:bg-white/90"
            onClick={onStart}
          >
            Start a new session
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
          <Button
            size="lg"
            variant="secondary"
            className="bg-white/10 text-white hover:bg-white/20"
            onClick={onJoinRoom}
          >
            Join an existing room
          </Button>
        </motion.div>
      </motion.section>

      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mx-auto grid w-full max-w-5xl grid-cols-1 gap-6 px-6 pb-24 md:grid-cols-2 lg:grid-cols-3"
      >
        {featureItems.map((item) => (
          <motion.div key={item.title} variants={itemVariants}>
            <Card className="group h-full border-white/10 bg-white/5 text-left text-white shadow-lg backdrop-blur">
              <CardHeader className="flex flex-row items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-400/10 text-emerald-300 transition-colors group-hover:bg-emerald-400/20">
                  <item.icon className="h-6 w-6" />
                </div>
                <CardTitle className="text-lg font-semibold text-white">
                  {item.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-white/70">
                {item.description}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.section>
    </div>
  );
};

export default HomeScreen;
