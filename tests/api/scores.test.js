import { createMocks } from 'node-mocks-http';
import handler from '../../pages/api/scores';
import * as db from '../../lib/db';

jest.mock('../../lib/db');

describe('/api/scores', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should submit score successfully', async () => {
    const mockSubmission = { id: 1, submitted_at: new Date() };
    db.createScoreSubmission.mockResolvedValue(mockSubmission);

    const { req, res } = createMocks({
      method: 'POST',
      body: { name: 'John Doe', score: 100 }
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(201);
    expect(JSON.parse(res._getData())).toEqual({
      success: true,
      id: 1
    });
    expect(db.createScoreSubmission).toHaveBeenCalledWith('John Doe', 100);
  });

  it('should reject empty name', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: { name: '', score: 100 }
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(400);
    expect(JSON.parse(res._getData())).toEqual({
      error: 'Name is required'
    });
  });

  it('should reject invalid score', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: { name: 'John', score: -10 }
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(400);
    expect(JSON.parse(res._getData())).toEqual({
      error: 'Invalid score'
    });
  });

  it('should reject non-POST methods', async () => {
    const { req, res } = createMocks({
      method: 'GET'
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(405);
  });
});