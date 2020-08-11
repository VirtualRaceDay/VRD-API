import db from '../db';
import * as RaceDayController from './raceDayController';
import * as RaceDayService from '../services/raceDayService';

import { createPlayer } from '../services/playerService';
import { createRace } from '../services/raceService';
import RaceDay from '../models/raceDayModel';

const mockRaceDay = {
  currency: 'RBX',
  name: 'name',
  pin: 'pin',
  initialStake: 1,
  maxPlayers: 1,
  players: [],
  races: [],
};

const mockPlayerNames = ['Alice', 'Bob', 'Carol'];

const res = {
  send: jest.fn().mockImplementation((payload) => payload)
};
res.status = jest.fn().mockImplementation(() => res);

afterAll(async () => db.disconnect());

describe('createRaceDay', () => {
  beforeAll(async () => RaceDay.deleteMany({}).exec());

  it('returns the id of a newly created race event', async () => {
    const req = {
      body: mockRaceDay,
    };

    const { code, data } = await RaceDayController.createRaceDay(req, res);
    expect(code).toBe(201);
    expect(data.id).toHaveLength(24);
  });

  it('returns a 400 response when an invalid race event is given', async () => {
    const req = { body: {} };

    const { code, data } = await RaceDayController.createRaceDay(req, res);
    expect(code).toBe(400);
    expect(data).toStrictEqual({});
  });

  it('returns a 500 for any other issue', async () => {
    const req = {};

    const { code, data } = await RaceDayController.createRaceDay(req, res);
    expect(code).toBe(500);
    expect(data).toBe('Internal Server Error: Cannot read property \'name\' of undefined');
  });
});

describe('getAllRaceDays', () => {
  beforeAll(async () => {
    await RaceDay.deleteMany({}).exec();
    await RaceDayService.createRaceDay(mockRaceDay);
  });

  it('returns an array of races', async () => {
    beforeAll(async () => {
      await createRace({
        name: 'race',
        link: 'link',
        horses: [],
        state: 'not-started'
      });
    });

    const { code, data } = await RaceDayController.getAllRaceDays({}, res);
    expect(code).toBe(200);
    expect(data).toHaveLength(1);
  });
});

describe('getRaceDayById', () => {
  beforeAll(async () => RaceDay.deleteMany({}).exec());

  it('returns the race if it has been found', async () => {
    const id = await RaceDayService.createRaceDay(mockRaceDay);

    const req = { params: { id } };

    const { code, data } = await RaceDayController.getRaceDayById(req, res);
    expect(code).toBe(200);
    expect(data.toObject()).toStrictEqual({ _id: expect.anything(), ...mockRaceDay, date: expect.any(Date), __v: expect.any(Number) });
  });

  it('returns 400 (bad request) if the id is not supplied', async () => {
    const req = { params: {} };

    const { code, data } = await RaceDayController.getRaceDayById(req, res);
    expect(code).toBe(400);
    expect(data).toBe('Id not specified');
  });

  it('returns 404 if the id does not exist in the database', async () => {
    const req = { params: { id: '321098765432109876543210' } };

    const { code, data } = await RaceDayController.getRaceDayById(req, res);
    expect(code).toBe(404);
    expect(data).toBe('Id not found');
  });
});

describe('getLeaderboardForRace', () => {
  let race;
  beforeAll(async () => {
    await RaceDay.deleteMany({});
    race = await (new RaceDay(mockRaceDay)).save();
    const players = await Promise.all(mockPlayerNames.map((name) => createPlayer(name, race).save()));
    race.players = players.map((player) => player._id);
    await race.save();
  });

  it('returns the correct list of player names', async () => {
    const req = {
      params: {
        id: race._id,
      }
    };

    const { code, data } = await RaceDayController.getLeaderboardForRace(req, res);
    expect(code).toBe(200);

    const { currency, players } = data;
    expect(currency).toBe('RBX');

    const receivedPlayers = players.map((player) => player);
    const expectedPlayers = mockPlayerNames.map((name) => ({ name, currentFunds: 1 }));
    expect(receivedPlayers).toHaveLength(3);
    expect(receivedPlayers).toMatchObject(expectedPlayers);
  });

  it('returns 400 (bad request) if the id is not supplied', async () => {
    const req = { params: {} };

    const { code, data } = await RaceDayController.getLeaderboardForRace(req, res);
    expect(code).toBe(400);
    expect(data).toBe('Id not specified');
  });

  it('returns 404 if the id does not exist in the database', async () => {
    const req = { params: { id: '321098765432109876543210' } };

    const { code, data } = await RaceDayController.getLeaderboardForRace(req, res);
    expect(code).toBe(404);
    expect(data).toBe('Id not found');
  });
});
