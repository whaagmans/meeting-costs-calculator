const rooms = new Map(
  Object.entries({
    OPEN123: { requiresPassword: false },
    SYNC456: { requiresPassword: true, password: 'sync' },
    DESIGN789: { requiresPassword: true, password: 'design' },
  }),
);

const normalizeCode = (code: string) => code.trim().toUpperCase();

export async function POST(request: Request) {
  const { roomCode, password } = await request.json();

  if (!roomCode || typeof roomCode !== 'string') {
    return Response.json(
      { status: 'invalid', message: 'Please provide a room code.' },
      { status: 400 },
    );
  }

  const normalizedCode = normalizeCode(roomCode);
  const room = rooms.get(normalizedCode);

  if (!room) {
    return Response.json(
      { status: 'not-found', message: 'Room not found.' },
      { status: 404 },
    );
  }

  if (!room.requiresPassword) {
    return Response.json(
      {
        status: 'success',
        message: 'Joined room successfully.',
        roomCode: normalizedCode,
      },
      { status: 200 },
    );
  }

  if (!password) {
    return Response.json(
      {
        status: 'requires-password',
        message: 'This room is protected by a password.',
        roomCode: normalizedCode,
      },
      { status: 200 },
    );
  }

  if (password !== room.password) {
    return Response.json(
      {
        status: 'invalid-password',
        message: 'Incorrect password supplied.',
        roomCode: normalizedCode,
      },
      { status: 401 },
    );
  }

  return Response.json(
    {
      status: 'success',
      message: 'Password accepted. Welcome in!',
      roomCode: normalizedCode,
    },
    { status: 200 },
  );
}
