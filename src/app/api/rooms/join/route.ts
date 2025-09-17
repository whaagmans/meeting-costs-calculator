import { NextRequest, NextResponse } from 'next/server';

type RoomConfig = {
  displayName: string;
  password?: string;
};

const ROOMS: Record<string, RoomConfig> = {
  OPENMEET: {
    displayName: 'Open Collaboration Space',
  },
  TEAMHUDDLE: {
    displayName: 'Team Huddle',
    password: 'sync',
  },
  RETROTIME: {
    displayName: 'Retro Time Capsule',
    password: 'retro',
  },
};

export async function POST(request: NextRequest) {
  const { code, password } = await request.json();

  if (!code || typeof code !== 'string') {
    return NextResponse.json(
      {
        status: 'bad_request',
        message: 'Please provide a valid room code to continue.',
      },
      { status: 400 },
    );
  }

  const normalizedCode = code.trim().toUpperCase();
  const room = ROOMS[normalizedCode];

  if (!room) {
    return NextResponse.json(
      {
        status: 'not_found',
        message: 'We could not find a room with that code.',
      },
      { status: 404 },
    );
  }

  if (room.password) {
    if (!password) {
      return NextResponse.json(
        {
          status: 'password_required',
          message: 'This room is protected. Please enter the password to join.',
        },
        { status: 401 },
      );
    }

    if (password !== room.password) {
      return NextResponse.json(
        {
          status: 'invalid_password',
          message: 'That password was not quite right. Try again!',
        },
        { status: 403 },
      );
    }
  }

  return NextResponse.json(
    {
      status: 'success',
      message: `Welcome to ${room.displayName}.`,
      roomCode: normalizedCode,
    },
    { status: 200 },
  );
}
