import * as RaceDayController from './raceDayController';

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

jest.mock('../services/raceDayService', () => ({
  createRaceDay: jest.fn().mockImplementation(() => '012345678901234567890123'),
  getAllRaceDays: jest.fn().mockImplementation(() => []),
  getRaceDayById: jest.fn().mockImplementationOnce((_id) => ({
    _id,
    ...mockRace
  })).mockImplementation(() => ({})),
}));

const res = {
  send: jest.fn().mockImplementation((payload) => payload)
};
res.status = jest.fn().mockImplementation(() => res);

describe('createRaceDay', () => {
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
  it('returns an array of races', async () => {
    const { code, data } = await RaceDayController.getAllRaceDays({}, res);
    expect(code).toBe(200);
    expect(data).toStrictEqual([]);
  });
});

describe('getRaceDayById', () => {
  it('returns the race if it has been found', async () => {
    const req = { params: { id: '012345678901234567890123' } };

    const { code, data } = await RaceDayController.getRaceDayById(req, res);
    expect(code).toBe(200);
    expect(data).toStrictEqual({ _id: '012345678901234567890123', ...mockRace });
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
