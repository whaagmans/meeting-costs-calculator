export type JoinRoomResult =
  | {
      status: 'joined';
      roomCode: string;
      roomName?: string;
    }
  | {
      status: 'password_required';
      roomCode: string;
      message: string;
    }
  | {
      status: 'invalid_password';
      roomCode: string;
      message: string;
    }
  | {
      status: 'not_found';
      roomCode: string;
      message: string;
    };

interface MockRoomRecord {
  name: string;
  password?: string | null;
}

const MOCK_ROOMS: Record<string, MockRoomRecord> = {
  ALPHA123: {
    name: 'Product Strategy Sync',
  },
  BETA456: {
    name: 'Design Review',
    password: 'sketch',
  },
  GAMMA789: {
    name: 'Finance Check-in',
    password: 'numbers',
  },
};

const wait = (duration = 700) =>
  new Promise((resolve) => setTimeout(resolve, duration));

export const joinRoom = async (
  roomCode: string,
  password?: string,
): Promise<JoinRoomResult> => {
  await wait();
  const normalizedCode = roomCode.trim().toUpperCase();

  if (!normalizedCode) {
    return {
      status: 'not_found',
      roomCode: normalizedCode,
      message: 'Enter a room code to continue.',
    };
  }

  const room = MOCK_ROOMS[normalizedCode];

  if (!room) {
    return {
      status: 'not_found',
      roomCode: normalizedCode,
      message: 'We could not find a room with that code.',
    };
  }

  if (room.password) {
    if (!password) {
      return {
        status: 'password_required',
        roomCode: normalizedCode,
        message: 'This room is protected. Enter the password to join.',
      };
    }

    if (password !== room.password) {
      return {
        status: 'invalid_password',
        roomCode: normalizedCode,
        message: 'That password was not correct. Try again.',
      };
    }
  }

  return {
    status: 'joined',
    roomCode: normalizedCode,
    roomName: room.name,
  };
};
