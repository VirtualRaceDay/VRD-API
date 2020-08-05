import db from '../db';
import * as PlayerController from './playerController';
import { createRaceDay } from '../services/raceDayService';
import RaceDay from '../models/raceDayModel';

const mockRace = {
  date: Date.now(),
  name: 'name',
  pin: 'pin',
  races: [
    {}
  ],
  initialStake: 1,
  maxPlayers: 1
};

jest.mock('../pub-sub/playerList', () => ({
  publish: jest.fn(),
  subscribe: jest.fn(),
  unsubscribe: jest.fn(),
}));

const res = {
  send: jest.fn().mockImplementation((payload) => payload)
};
res.status = jest.fn().mockImplementation(() => res);

afterAll(async () => db.disconnect());

describe('createNewPlayer', () => {
  beforeAll(async () => {
    await RaceDay.deleteMany({}).exec();
    await createRaceDay(mockRace);
  });
  it('returns the id of a newly created player, with the id of the race they have joined', async () => {
    const req = {
      body: {
        pin: 'pin',
        nickname: 'nickname',
      },
    };

    const { code, data } = await PlayerController.createNewPlayer(req, res);
    expect(code).toBe(201);
    expect(data.playerId).toHaveLength(24);
    expect(data.raceDayId).toHaveLength(24);
  });

  it('returns a 400 response when an invalid race event is given', async () => {
    const req = { body: {}};

    const { code, data } = await PlayerController.createNewPlayer(req, res);
    expect(code).toBe(400);
    expect(data).toStrictEqual({});
  });

  it('returns a 404 when the pin cannot be found', async () => {
    const req = {
      body: {
        pin: 'invalid',
        nickname: 'nickname',
      },
    };

    const { code, data } = await PlayerController.createNewPlayer(req, res);
    expect(code).toBe(404);
    expect(data).toBe('No race for this pin');
  });

  it('returns a 500 for any other issue', async () => {
    const req = {};

    const { code } = await PlayerController.createNewPlayer(req, res);
    expect(code).toBe(500);
  });
});
