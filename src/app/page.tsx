'use client';

import MeetingDashboard from '@/components/meeting-dashboard';
import { StopwatchProvider } from '@/components/useStopwatch';

export default function Home() {
  return (
    <main className="relative">
      <StopwatchProvider>
        <MeetingDashboard />
      </StopwatchProvider>
    </main>
  );
}
