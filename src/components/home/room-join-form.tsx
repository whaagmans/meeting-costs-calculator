'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { Loader2, Lock, Unlock } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const RoomJoinForm = () => {
  const router = useRouter();
  const [roomCode, setRoomCode] = useState('');
  const [password, setPassword] = useState('');
  const [needsPassword, setNeedsPassword] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const isJoinDisabled = isLoading || (needsPassword && password.trim().length === 0);

  useEffect(() => {
    setNeedsPassword(false);
    setPassword('');
    setFeedback(null);
    setIsError(false);
  }, [roomCode]);

  const handleJoinRoom = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!roomCode.trim()) {
      setFeedback('Please enter a room code to continue.');
      setIsError(true);
      return;
    }

    setIsLoading(true);
    setFeedback(null);
    setIsError(false);

    try {
      const response = await fetch('/api/rooms/join', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code: roomCode,
          password: needsPassword ? password : undefined,
        }),
      });

      const data = await response.json();

      if (response.status === 401) {
        setNeedsPassword(true);
        setFeedback(data.message);
        setIsError(false);
        return;
      }

      if (response.status === 403) {
        setNeedsPassword(true);
        setFeedback(data.message);
        setIsError(true);
        return;
      }

      if (!response.ok) {
        setFeedback(data.message ?? 'Something went wrong. Please try again.');
        setIsError(true);
        return;
      }

      setFeedback(data.message ?? 'Room joined successfully!');
      setIsError(false);
      setNeedsPassword(false);
      setPassword('');

      setTimeout(() => {
        router.push(`/meeting?room=${data.roomCode ?? roomCode}`);
      }, 650);
    } catch (error) {
      console.error('Failed to join room', error);
      setFeedback('We were unable to connect. Please try again in a moment.');
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      className="mx-auto max-w-xl"
    >
      <Card className="overflow-hidden border border-border/40 bg-background/70 shadow-xl backdrop-blur">
        <motion.div
          className="h-2 w-full bg-gradient-to-r from-primary via-sky-500 to-purple-500"
          layout
          animate={{ scaleX: isLoading ? 1 : 0 }}
          style={{ transformOrigin: 'left' }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
        />
        <CardHeader className="space-y-2">
          <CardTitle className="flex items-center gap-2 text-2xl font-semibold">
            {needsPassword ? <Lock className="h-5 w-5 text-primary" /> : <Unlock className="h-5 w-5 text-primary" />}
            Join a room
          </CardTitle>
          <CardDescription>
            Enter your room code to hop into a session. We&apos;ll prompt for a password if one is needed.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-6" onSubmit={handleJoinRoom}>
            <div className="space-y-2">
              <Label htmlFor="room-code">Room code</Label>
              <Input
                id="room-code"
                autoComplete="off"
                value={roomCode}
                onChange={(event) => setRoomCode(event.target.value.toUpperCase())}
                placeholder="e.g. OPENMEET"
                className="h-12 text-lg"
                aria-describedby={feedback ? 'room-feedback' : undefined}
              />
            </div>
            <AnimatePresence initial={false}>
              {needsPassword && (
                <motion.div
                  key="password-field"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-2"
                >
                  <Label htmlFor="room-password">Room password</Label>
                  <Input
                    id="room-password"
                    type="password"
                    value={password}
                  onChange={(event) => {
                    setPassword(event.target.value);
                    setFeedback(null);
                  }}
                    placeholder="Enter the secret password"
                    className="h-12"
                  />
                </motion.div>
              )}
            </AnimatePresence>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <AnimatePresence initial={false}>
                {feedback && (
                  <motion.p
                    id="room-feedback"
                    key={feedback}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    className={`text-sm ${isError ? 'text-destructive' : 'text-emerald-500'}`}
                  >
                    {feedback}
                  </motion.p>
                )}
              </AnimatePresence>
              <Button
                type="submit"
                size="lg"
                className="sm:ml-auto"
                disabled={isJoinDisabled}
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Joining...
                  </span>
                ) : (
                  'Join room'
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default RoomJoinForm;
