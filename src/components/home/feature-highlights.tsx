'use client';

import { motion } from 'framer-motion';
import { CalendarClock, LayoutDashboard, ShieldCheck } from 'lucide-react';

const features = [
  {
    icon: LayoutDashboard,
    title: 'Intuitive controls',
    description:
      'Add your teammates, reveal their hourly cost, and start tracking expenses in just a few taps.',
  },
  {
    icon: CalendarClock,
    title: 'Real-time impact',
    description:
      'Watch the meeting total update as time passes so you can pause, resume, or wrap up with confidence.',
  },
  {
    icon: ShieldCheck,
    title: 'Room-ready',
    description:
      'Join protected rooms with ease and keep sensitive meeting details safe behind friendly prompts.',
  },
];

const FeatureHighlights = () => {
  return (
    <div
      id="learn-more"
      className="grid gap-6 pb-16 sm:grid-cols-2 lg:grid-cols-3"
    >
      {features.map(({ icon: Icon, title, description }, index) => (
        <motion.div
          key={title}
          className="group relative overflow-hidden rounded-3xl border border-border/40 bg-background/60 p-6 shadow-lg backdrop-blur"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.08 }}
          viewport={{ once: true, amount: 0.4 }}
        >
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          <div className="relative space-y-3">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary shadow-inner">
              <Icon className="h-6 w-6" />
            </span>
            <h3 className="text-xl font-semibold">{title}</h3>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default FeatureHighlights;
