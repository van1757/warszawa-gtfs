import express, { Request, Response } from 'express';

import config from '../config.js';
import GTFSService from '../gtfsService.js';

const router = express.Router();

const REQUIRED_STOPS_FIELDS = [
  'stop_id',
  'stop_name',
  'stop_lat',
  'stop_lon',
];

router.get('/', async (_req: Request, res: Response) => {
  const stops = new GTFSService(config).getStops({ fields: REQUIRED_STOPS_FIELDS });

  res.send(stops);
});

export default router;
