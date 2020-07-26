import request from 'supertest';
import Server from './server';

describe('API Server GET /', () => {
  it('should return 200', async () => {
    const server = Server.initialise();

    const response = await request(server).get('/');
    expect(response.statusCode).toBe(200);
  });
});
