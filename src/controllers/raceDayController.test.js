import db from '../db';
import * as RaceDayController from './raceDayController';
import * as RaceDayService from '../services/raceDayService';
import RaceDay from '../models/raceDayModel';

const mockRace = {
  name: 'name',
  pin: 'pin',
  races: [
    {}
  ],
  initialStake: 1,
  maxPlayers: 1,
  players: []
};

const res = {
  send: jest.fn().mockImplementation((payload) => payload)
};
res.status = jest.fn().mockImplementation(() => res);

afterAll(async () => db.disconnect());

describe('createRaceDay', () => {
  afterAll(async () => RaceDay.deleteMany({}).exec());

  it('returns the id of a newly created race event', async () => {
    const req = {
      body: mockRace,
    };

    const { code, data } = await RaceDayController.createRaceDay(req, res);
    expect(code).toBe(201);
    expect(data.id).toHaveLength(24);
  });

  it('returns a 400 response when an invalid race event is given', async () => {
    const req = { body: {}};

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
  beforeAll(async () => RaceDayService.createRaceDay(mockRace));
  afterAll(async () => RaceDay.deleteMany({}).exec());

  it('returns an array of races', async () => {
    const { code, data } = await RaceDayController.getAllRaceDays({}, res);
    expect(code).toBe(200);
    expect(data).toHaveLength(1);
  });
});

describe('getRaceDayById', () => {
  afterAll(async () => RaceDay.deleteMany({}).exec());

  it('returns the race if it has been found', async () => {
    const id = await RaceDayService.createRaceDay(mockRace);

    const req = { params: { id } };

    const { code, data } = await RaceDayController.getRaceDayById(req, res);
    expect(code).toBe(200);
    expect(data.toObject()).toStrictEqual({ _id: expect.anything(), ...mockRace, date: expect.any(Date), __v: expect.any(Number) });
  });

  it('returns 404 if the id is not supplied', async () => {
    const req = { params: {} };

    const { code, data } = await RaceDayController.getRaceDayById(req, res);
    expect(code).toBe(404);
    expect(data).toBe('Id not found');
  });

  it('returns 404 if the id does not exist in the database', async () => {
    const req = { params: { id: '321098765432109876543210'} };

    const { code, data } = await RaceDayController.getRaceDayById(req, res);
    expect(code).toBe(404);
    expect(data).toBe('Id not found');
  });
});
