'use client';

import RoomJoinForm from '@/components/room-join-form';
import { Button } from '@/components/ui/button';
import {
  ArrowRight,
  Clock3,
  Sparkles,
  TrendingUp,
  Users2,
} from 'lucide-react';

const features = [
  {
    title: 'Real-time cost awareness',
    description:
      'Watch the meeting burn rate update every second so your team can stay focused on what matters most.',
    icon: Clock3,
  },
  {
    title: 'Human friendly insights',
    description:
      'Beautiful dashboards, easy-to-read summaries and subtle cues help you communicate value and urgency.',
    icon: Users2,
  },
  {
    title: 'Optimized for action',
    description:
      'Pause, resume and reset instantly with confident controls that respond to every interaction.',
    icon: TrendingUp,
  },
];

const HomeScreen = ({
  onEnterMeeting,
}: {
  onEnterMeeting: (roomCode?: string) => void;
}) => {
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-14 px-6 py-16 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex flex-1 flex-col gap-8 text-center lg:text-left">
        <span className="mx-auto inline-flex items-center justify-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-fuchsia-100 shadow-lg shadow-fuchsia-500/20 backdrop-blur lg:mx-0">
          <Sparkles className="h-4 w-4 animate-spin-slow text-fuchsia-300" />
          Crafted to make every minute count
        </span>
        <div className="space-y-6">
          <h1 className="text-4xl font-bold tracking-tight text-white drop-shadow-sm md:text-5xl lg:text-6xl">
            Meeting intelligence that feels effortless
          </h1>
          <p className="text-lg text-slate-200 md:text-xl">
            Transform the way your team collaborates with a thoughtfully designed meeting cost calculator. See impact instantly, stay aligned, and make room for meaningful conversations.
          </p>
        </div>
        <ul className="grid gap-6 text-left sm:grid-cols-2">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <li
                key={feature.title}
                className="group rounded-2xl border border-white/5 bg-white/5 p-6 shadow-lg shadow-slate-950/50 transition-all duration-300 hover:-translate-y-1 hover:border-fuchsia-400/40 hover:bg-white/10"
              >
                <div className="mb-4 inline-flex rounded-full bg-fuchsia-500/10 p-3 text-fuchsia-200 shadow-inner">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-semibold text-white">{feature.title}</h3>
                <p className="mt-2 text-sm text-slate-200/80">{feature.description}</p>
              </li>
            );
          })}
        </ul>
        <div className="flex flex-col justify-center gap-4 sm:flex-row lg:justify-start">
          <Button
            size="lg"
            className="group w-full justify-center bg-fuchsia-500 text-white shadow-lg shadow-fuchsia-500/40 transition-transform duration-300 hover:-translate-y-1 hover:bg-fuchsia-400 sm:w-auto"
            onClick={() => onEnterMeeting()}
          >
            Start a demo meeting
            <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
          </Button>
          <Button
            size="lg"
            variant="secondary"
            className="w-full justify-center border border-white/10 bg-white/10 text-white shadow-lg shadow-slate-900/40 backdrop-blur transition-transform duration-300 hover:-translate-y-1 hover:bg-white/20 sm:w-auto"
            onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}
          >
            Explore the platform
          </Button>
        </div>
      </div>
      <div className="flex flex-1 flex-col items-center justify-center">
        <RoomJoinForm onJoinSuccess={onEnterMeeting} />
      </div>
    </div>
  );
};

export default HomeScreen;
