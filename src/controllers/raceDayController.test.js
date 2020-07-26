import * as RaceDayController from './raceDayController';

jest.mock('../services/raceDayService', () => ({
  createRaceDay: jest.fn().mockImplementation(() => 'ID'),
}));

const res = {};
res.send = jest.fn().mockImplementation(() => res);
res.status = jest.fn().mockImplementation(() => res);

describe('createRaceDay', () => {
  it('returns the id of a newly created race event', async () => {
    const req = {
      body: {
        name: 'name',
        pin: 'pin',
        races: [
          {}
        ],
        initialStake: 1,
        maxPlayers: 1
      }
    };

    const response = await RaceDayController.createRaceDay(req, res);
    expect(response.send).toHaveBeenCalledWith({ code: 201, data: { id: 'ID' }});
  });

  it('returns a 400 response when an invalid race event is given', async () => {
    const req = { body: {}};
    const response = await RaceDayController.createRaceDay(req, res);
    expect(response.send).toHaveBeenCalledWith({ code: 400, data: {}});
  });

  it('returns a 500 for any other issue', async () => {
    const req = {};
    const response = await RaceDayController.createRaceDay(req, res);
    expect(response.send).toHaveBeenCalledWith({ code: 500, data: 'Internal Server Error: Cannot read property \'name\' of undefined' });
  });
});
