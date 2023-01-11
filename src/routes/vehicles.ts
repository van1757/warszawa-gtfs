import express, { Request, Response } from 'express';

import { getVehiclePositions } from '../gtfsService.js';

const router = express.Router();

interface IVehicleLocationRequest extends Request {
  query: {
    trip_id: string;
  }
}

router.get('/', async (req: IVehicleLocationRequest, res: Response) => {
  const vehiclePosition = getVehiclePositions({ trip_id: req.query.trip_id });

  res.send(vehiclePosition[0]);
});

export default router;
