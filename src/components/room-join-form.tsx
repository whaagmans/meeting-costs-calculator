'use client';

import { useCallback, useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, Lock, Unlock, XCircle } from 'lucide-react';

interface JoinResponse {
  requiresPassword?: boolean;
  message?: string;
  success?: boolean;
  error?: string;
  room?: {
    code: string;
  };
}

const RoomJoinForm = ({
  onJoinSuccess,
}: {
  onJoinSuccess: (roomCode?: string) => void;
}) => {
  const [roomCode, setRoomCode] = useState('');
  const [password, setPassword] = useState('');
  const [requiresPassword, setRequiresPassword] = useState(false);
  const [status, setStatus] = useState<'idle' | 'loading' | 'error' | 'success'>(
    'idle',
  );
  const [feedback, setFeedback] = useState('');
  const [shouldShake, setShouldShake] = useState(false);

  const uppercaseRoomCode = useMemo(
    () => roomCode.trim().toUpperCase(),
    [roomCode],
  );

  const triggerShake = useCallback(() => {
    setShouldShake(true);
    setTimeout(() => setShouldShake(false), 600);
  }, []);

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (!roomCode.trim()) {
        setFeedback('Please enter your meeting room code to continue.');
        triggerShake();
        return;
      }

      setStatus('loading');
      setFeedback('');

      try {
        const response = await fetch('/api/rooms/join', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            code: uppercaseRoomCode,
            password: requiresPassword ? password : undefined,
          }),
        });

        const data: JoinResponse = await response.json();

        if (data.requiresPassword) {
          setRequiresPassword(true);
          setFeedback(
            data.message || 'This meeting is protected. Please enter the password.',
          );
          setStatus('idle');
          return;
        }

        if (!response.ok || !data.success) {
          setStatus('error');
          setFeedback(data.error || 'Unable to join the meeting room.');
          triggerShake();
          return;
        }

        setStatus('success');
        setFeedback('Access granted! Preparing your meeting dashboard…');
        setTimeout(() => {
          onJoinSuccess(data.room?.code || uppercaseRoomCode);
        }, 800);
      } catch (error) {
        setStatus('error');
        setFeedback('Something went wrong while joining the meeting. Please try again.');
        triggerShake();
      }
    },
    [
      onJoinSuccess,
      requiresPassword,
      roomCode,
      triggerShake,
      uppercaseRoomCode,
      password,
    ],
  );

  const isJoinDisabled =
    status === 'loading' || (requiresPassword ? !password.trim() : !roomCode.trim());

  return (
    <Card
      className={`w-full max-w-md transform bg-slate-900/80 text-white shadow-2xl shadow-slate-950/60 backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:shadow-fuchsia-500/30 ${
        shouldShake ? 'animate-shake' : ''
      }`}
    >
      <CardHeader>
        <CardTitle className="text-2xl font-semibold text-white">
          Join your meeting room
        </CardTitle>
        <p className="text-sm text-slate-300">
          Enter your room code below. We’ll secure the rest.
        </p>
      </CardHeader>
      <CardContent>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <Label htmlFor="room-code" className="text-sm font-medium text-slate-200">
              Room code
            </Label>
            <Input
              id="room-code"
              value={roomCode}
              onChange={(event) => {
                setRoomCode(event.target.value);
                if (requiresPassword) {
                  setRequiresPassword(false);
                  setPassword('');
                }
                if (status === 'error') {
                  setStatus('idle');
                  setFeedback('');
                }
              }}
              placeholder="e.g. ALPHA"
              className="border-white/10 bg-white/5 text-base uppercase tracking-[0.4em] text-white placeholder:text-slate-400 focus:border-fuchsia-400 focus:ring-0"
            />
          </div>
          {requiresPassword && (
            <div className="space-y-2 animate-in fade-in slide-in-from-top-2">
              <Label htmlFor="password" className="text-sm font-medium text-slate-200">
                Meeting password
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                  if (status === 'error') {
                    setStatus('idle');
                    setFeedback('');
                  }
                }}
                placeholder="Enter password"
                className="border-white/10 bg-white/5 text-white placeholder:text-slate-400 focus:border-fuchsia-400 focus:ring-0"
              />
            </div>
          )}

          {feedback && (
            <div
              className={`flex items-start gap-2 rounded-xl border px-3 py-2 text-sm shadow-inner transition-all ${
                status === 'error'
                  ? 'border-red-500/40 bg-red-500/10 text-red-100'
                  : 'border-emerald-500/40 bg-emerald-500/10 text-emerald-100'
              }`}
            >
              {status === 'error' ? (
                <XCircle className="mt-0.5 h-4 w-4 flex-shrink-0" />
              ) : (
                <Unlock className="mt-0.5 h-4 w-4 flex-shrink-0" />
              )}
              <p>{feedback}</p>
            </div>
          )}

          <Button
            type="submit"
            size="lg"
            disabled={isJoinDisabled}
            className="w-full justify-center gap-2 bg-fuchsia-500 text-white shadow-lg shadow-fuchsia-500/30 transition-transform duration-300 hover:-translate-y-0.5 hover:bg-fuchsia-400 disabled:cursor-not-allowed disabled:bg-fuchsia-500/40"
          >
            {status === 'loading' ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Checking room…
              </>
            ) : requiresPassword ? (
              <>
                <Lock className="h-5 w-5" />
                Confirm & enter
              </>
            ) : (
              'Join meeting'
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default RoomJoinForm;
