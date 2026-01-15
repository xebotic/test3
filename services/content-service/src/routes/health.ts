import { Router, Request, Response } from 'express';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  res.json({
    status: 'healthy',
    service: 'content-service',
    timestamp: new Date().toISOString(),
  });
});

router.get('/ready', (req: Request, res: Response) => {
  // TODO: Check database connection
  res.json({
    ready: true,
    checks: {
      database: 'not_implemented',
      redis: 'not_implemented',
    },
  });
});

export default router;
