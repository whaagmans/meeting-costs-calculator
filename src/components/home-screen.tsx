'use client';

import { motion } from 'framer-motion';
import { Button } from './ui/button';
import RoomJoinForm from './room-join-form';

interface HomeScreenProps {
  onStartMeeting: () => void;
  onJoinRoom: (roomCode: string) => void;
}

const featureCards = [
  {
    title: 'Track meeting burn rate',
    description:
      'See the running cost of your meeting in real time and keep everyone mindful of their time.',
  },
  {
    title: 'Manage attendees effortlessly',
    description:
      'Add and edit participants with their pay details and work schedules to get accurate numbers.',
  },
  {
    title: 'Collaborate in shared rooms',
    description:
      'Join protected rooms by code so the whole team can stay aligned on meeting costs.',
  },
];

const HomeScreen = ({ onStartMeeting, onJoinRoom }: HomeScreenProps) => {
  return (
    <div className="flex flex-col items-center px-6 py-16 lg:py-24 gap-12 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="max-w-3xl space-y-6"
      >
        <span className="inline-flex items-center rounded-full border border-primary/40 bg-primary/10 px-4 py-1 text-sm font-semibold uppercase tracking-wider text-primary shadow-sm">
          Stay on top of meeting costs
        </span>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
          Every minute counts. Make your meetings intentional.
        </h1>
        <p className="text-lg text-muted-foreground">
          Meeting Costs Calculator helps you understand the true cost of bringing people together. Plan smarter, stay on time, and make space for focused work.
        </p>
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button size="lg" onClick={onStartMeeting} className="px-8 text-base">
            Launch the calculator
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={onStartMeeting}
            className="px-8 text-base"
          >
            Create a new room
          </Button>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
        className="grid w-full max-w-5xl gap-6 md:grid-cols-3"
      >
        {featureCards.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 * index }}
            className="rounded-2xl border border-primary/10 bg-background/70 p-6 text-left shadow-lg shadow-primary/10 backdrop-blur"
          >
            <h3 className="text-xl font-semibold">{feature.title}</h3>
            <p className="mt-3 text-sm text-muted-foreground">{feature.description}</p>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
        className="w-full flex justify-center"
      >
        <RoomJoinForm onEnterRoom={onJoinRoom} />
      </motion.div>
    </div>
  );
};

export default HomeScreen;
