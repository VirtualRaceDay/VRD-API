import request from 'supertest';

import server from './server';

jest.mock('./routes/raceDayRoutes', () => () => {});

describe('API Server GET /', () => {
  it('should return 200', async () => {
    const response = await request(server).get('/');
    expect(response.statusCode).toBe(200);
  });
});
