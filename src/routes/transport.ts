import express, { Request, Response } from 'express';

import config from '../config.js';
import GTFSService from '../gtfsService.js';

const router = express.Router();

interface IVehicleLocationRequest extends Request {
  query: {
    date: string;
    stop_id: string;
    route_id: string;
    trip_headsign: string;
  }
}

router.get('/location', async (req: IVehicleLocationRequest, res: Response) => {
  const { date } = req.query;
  const gtfsService = new GTFSService(config);

  await gtfsService.syncRealtimeData();

  const vehiclePosition = await gtfsService.getVehiclePosition({
    ...req.query,
    date: Number(date),
  });

  res.send(vehiclePosition);
});

export default router;
