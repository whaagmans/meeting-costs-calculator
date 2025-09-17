import { NextResponse } from 'next/server';

type Room = {
  code: string;
  requiresPassword: boolean;
  password?: string;
};

const rooms: Room[] = [
  { code: 'ALPHA', requiresPassword: false },
  { code: 'BRAVO', requiresPassword: true, password: 'strategy' },
  { code: 'DELTA', requiresPassword: true, password: 'focus' },
];

export async function POST(request: Request) {
  const { code, password }: { code?: string; password?: string } =
    await request.json();

  if (!code) {
    return NextResponse.json(
      { error: 'Room code is required to join a meeting.' },
      { status: 400 },
    );
  }

  const normalizedCode = code.trim().toUpperCase();
  const room = rooms.find((entry) => entry.code === normalizedCode);

  if (!room) {
    return NextResponse.json(
      { error: 'We could not find a meeting with that code.' },
      { status: 404 },
    );
  }

  if (room.requiresPassword) {
    if (!password) {
      return NextResponse.json({
        requiresPassword: true,
        message: 'This room is protected. Enter the password to continue.',
      });
    }

    if (room.password !== password) {
      return NextResponse.json(
        { error: 'The password you entered is incorrect.' },
        { status: 401 },
      );
    }
  }

  return NextResponse.json({
    success: true,
    room: { code: room.code },
  });
}
