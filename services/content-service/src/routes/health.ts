import { Router, Request, Response } from 'express';
import { checkDatabaseHealth } from '../utils/database';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  res.json({
    status: 'healthy',
    service: 'content-service',
    timestamp: new Date().toISOString(),
  });
});

router.get('/ready', async (req: Request, res: Response) => {
  const dbHealthy = await checkDatabaseHealth();

  const ready = dbHealthy;
  const statusCode = ready ? 200 : 503;

  res.status(statusCode).json({
    ready,
    checks: {
      database: dbHealthy ? 'healthy' : 'unhealthy',
    },
  });
});

export default router;
