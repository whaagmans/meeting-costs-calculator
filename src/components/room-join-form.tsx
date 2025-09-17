'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { joinRoom, type JoinRoomResult } from '@/lib/room-service';
import { Loader2, Lock, LogIn, RotateCcw } from 'lucide-react';

interface RoomJoinFormProps {
  onCancel: () => void;
  onSuccess: (details: { code: string; name?: string }) => void;
}

type FeedbackState =
  | { type: 'error'; message: string }
  | { type: 'info'; message: string }
  | { type: 'success'; message: string };

const feedbackVariants = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.2 } },
};

const RoomJoinForm = ({ onCancel, onSuccess }: RoomJoinFormProps) => {
  const [roomCode, setRoomCode] = useState('');
  const [password, setPassword] = useState('');
  const [requiresPassword, setRequiresPassword] = useState(false);
  const [feedback, setFeedback] = useState<FeedbackState | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const timeoutRef = useRef<number>();

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleResult = (result: JoinRoomResult) => {
    if (result.status === 'joined') {
      setFeedback({
        type: 'success',
        message: `Welcome! You are in ${result.roomName ?? "the room"}.`,
      });
      timeoutRef.current = window.setTimeout(() => {
        onSuccess({ code: result.roomCode, name: result.roomName });
      }, 650);
      return;
    }

    if (result.status === 'password_required') {
      setRequiresPassword(true);
      setFeedback({ type: 'info', message: result.message });
      return;
    }

    if (result.status === 'invalid_password') {
      setRequiresPassword(true);
      setFeedback({ type: 'error', message: result.message });
      return;
    }

    if (result.status === 'not_found') {
      setFeedback({ type: 'error', message: result.message });
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setFeedback(null);

    const result = await joinRoom(roomCode, requiresPassword ? password : undefined);
    setIsSubmitting(false);
    handleResult(result);
  };

  const resetForm = () => {
    setRoomCode('');
    setPassword('');
    setRequiresPassword(false);
    setFeedback(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="flex min-h-screen items-center justify-center px-6 pb-16 pt-24"
    >
      <Card className="w-full max-w-md border-white/20 bg-white/10 text-white shadow-2xl backdrop-blur">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <Lock className="h-6 w-6" /> Join a room
          </CardTitle>
          <CardDescription className="text-white/70">
            Enter your room code to continue. We will let you know if a password is
            required.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="room-code" className="text-white/80">
                Room code
              </Label>
              <Input
                id="room-code"
                value={roomCode}
                onChange={(event) => setRoomCode(event.target.value.toUpperCase())}
                placeholder="e.g. ALPHA123"
                className="border-white/20 bg-white/5 text-white placeholder:text-white/40"
                autoFocus
                required
              />
            </div>
            <AnimatePresence initial={false}>
              {requiresPassword && (
                <motion.div
                  key="password-field"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  className="overflow-hidden space-y-2"
                >
                  <Label htmlFor="room-password" className="text-white/80">
                    Room password
                  </Label>
                  <Input
                    id="room-password"
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="Enter the password"
                    className="border-white/20 bg-white/5 text-white placeholder:text-white/40"
                    required
                  />
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence mode="wait">
              {feedback && (
                <motion.div
                  key={feedback.message}
                  variants={feedbackVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className={`rounded-md border px-3 py-2 text-sm ${
                    feedback.type === 'error'
                      ? 'border-red-500/40 bg-red-500/10 text-red-200'
                      : feedback.type === 'success'
                        ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-100'
                        : 'border-sky-400/40 bg-sky-400/10 text-sky-100'
                  }`}
                >
                  {feedback.message}
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>
          <CardFooter className="flex flex-col gap-3 sm:flex-row sm:justify-between">
            <Button
              type="button"
              variant="ghost"
              className="text-white hover:bg-white/10"
              onClick={onCancel}
            >
              Cancel
            </Button>
            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <Button
                type="button"
                variant="secondary"
                className="bg-white/10 text-white hover:bg-white/20"
                onClick={resetForm}
              >
                <RotateCcw className="mr-2 h-4 w-4" /> Reset
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-emerald-400 text-slate-900 hover:bg-emerald-300"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Checking...
                  </>
                ) : (
                  <>
                    <LogIn className="mr-2 h-4 w-4" /> Join room
                  </>
                )}
              </Button>
            </div>
          </CardFooter>
        </form>
      </Card>
    </motion.div>
  );
};

export default RoomJoinForm;
