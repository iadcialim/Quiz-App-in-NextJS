import { createMocks } from 'node-mocks-http';
import handler from '../../pages/api/leaderboard';
import * as db from '../../lib/db';

jest.mock('../../lib/db');

describe('/api/leaderboard', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return leaderboard data', async () => {
    const mockLeaderboard = [
      { name: 'Alice', score: 100, submitted_at: new Date() },
      { name: 'Bob', score: 80, submitted_at: new Date() }
    ];
    db.getLeaderboard.mockResolvedValue(mockLeaderboard);

    const { req, res } = createMocks({
      method: 'GET'
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(JSON.parse(res._getData())).toEqual(mockLeaderboard);
    expect(db.getLeaderboard).toHaveBeenCalled();
  });

  it('should handle database errors', async () => {
    db.getLeaderboard.mockRejectedValue(new Error('DB Error'));

    const { req, res } = createMocks({
      method: 'GET'
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(500);
    expect(JSON.parse(res._getData())).toEqual({
      error: 'Failed to load leaderboard'
    });
  });

  it('should reject non-GET methods', async () => {
    const { req, res } = createMocks({
      method: 'POST'
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(405);
  });
});