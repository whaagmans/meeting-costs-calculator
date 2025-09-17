'use client';

import { FormEvent, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';

interface RoomJoinFormProps {
  onEnterRoom?: (roomCode: string) => void;
}

type StepState = 'idle' | 'requires-password' | 'success';

interface ApiResponse {
  status: 'invalid' | 'not-found' | 'requires-password' | 'invalid-password' | 'success';
  message: string;
  roomCode?: string;
}

const feedbackVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
};

const RoomJoinForm = ({ onEnterRoom }: RoomJoinFormProps) => {
  const [step, setStep] = useState<StepState>('idle');
  const [roomCode, setRoomCode] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const resetFeedback = () => {
    setFeedback(null);
    setError(null);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (loading) return;
    resetFeedback();
    setLoading(true);

    try {
      const response = await fetch('/api/rooms/join', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          roomCode,
          password: step === 'requires-password' ? password : undefined,
        }),
      });

      const data = (await response.json()) as ApiResponse;

      if (data.status === 'requires-password') {
        setStep('requires-password');
        setFeedback(data.message);
      } else if (data.status === 'invalid-password') {
        setStep('requires-password');
        setPassword('');
        setError('That password was incorrect. Try again.');
      } else if (data.status === 'not-found') {
        setStep('idle');
        setError('We could not find that room. Double-check the code.');
      } else if (data.status === 'invalid') {
        setStep('idle');
        setError('Please enter a valid room code to continue.');
      } else if (data.status === 'success') {
        setStep('success');
        setFeedback('Success! Redirecting you to the room...');
        setTimeout(() => {
          onEnterRoom?.(data.roomCode ?? roomCode);
          setLoading(false);
        }, 600);
        return;
      }
    } catch (err) {
      setError('Something went wrong while joining. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const isPasswordStep = step === 'requires-password';

  return (
    <Card className="w-full max-w-xl backdrop-blur border-primary/20 bg-background/70">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold tracking-tight">Join a meeting room</CardTitle>
        <CardDescription>
          Enter the shared room code below. If the room is protected, we&apos;ll ask for the password.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-2">
            <label htmlFor="room-code" className="text-sm font-medium">
              Room code
            </label>
            <Input
              id="room-code"
              value={roomCode}
              onChange={(event) => setRoomCode(event.target.value.toUpperCase())}
              placeholder="e.g. OPEN123"
              maxLength={8}
              disabled={loading || step === 'success'}
              className="uppercase tracking-wider text-lg"
            />
          </div>

          <AnimatePresence mode="wait">
            {isPasswordStep && (
              <motion.div
                key="password"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                className="grid gap-2"
              >
                <label htmlFor="password" className="text-sm font-medium">
                  Room password
                </label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Enter the secret"
                  disabled={loading || step === 'success'}
                />
              </motion.div>
            )}
          </AnimatePresence>

          <Button
            type="submit"
            size="lg"
            className="w-full transition-transform hover:translate-y-[-2px]"
            disabled={loading || !roomCode.trim() || step === 'success'}
          >
            {loading
              ? 'Checking room...'
              : isPasswordStep
                ? 'Submit password'
                : 'Join room'}
          </Button>
        </form>

        <div className="min-h-[48px] mt-4">
          <AnimatePresence mode="wait">
            {feedback && !error && (
              <motion.p
                key="feedback"
                variants={feedbackVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.25 }}
                className="text-sm text-emerald-500"
              >
                {feedback}
              </motion.p>
            )}
            {error && (
              <motion.p
                key="error"
                variants={feedbackVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.25 }}
                className="text-sm text-destructive"
              >
                {error}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </CardContent>
    </Card>
  );
};

export default RoomJoinForm;
