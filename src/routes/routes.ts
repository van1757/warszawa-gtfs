import express, { Request, Response } from 'express';

import config from '../config.js';
import GTFSService from '../gtfsService.js';

const router = express.Router();

interface IRoutesRequest extends Request {
  query: {
    id: string;
  }
}

router.get('/:id', async (req: IRoutesRequest, res: Response) => {
  const routes = await new GTFSService(config).getRoutes(req.params.id);

  res.send(routes);
});

export default router;
