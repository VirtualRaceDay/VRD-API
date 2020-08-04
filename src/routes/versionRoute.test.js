import request from 'supertest';
import Server from '../server/server';
import versionRoutes from './versionRoute';

describe('API /version', () => {
  it('should return 200 on GET', async () => {
    const server = Server.initialise();
    server.use('/', versionRoutes);

    const response = await request(server).get('/version');
    expect(response.statusCode).toBe(200);
  });
});
