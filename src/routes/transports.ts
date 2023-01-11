import express, { Request, Response } from 'express';

import { findOneBySql, getVehiclePositions } from '../gtfsService.js';
import { IStopTime } from '../types/gtfs.js';
import getCurrentSeconds from '../utils/time.js';

const router = express.Router();

const SQL_QUERY = `
  SELECT stop_times.trip_id FROM stop_times
    INNER JOIN trips ON stop_times.trip_id = trips.trip_id
    INNER JOIN calendar_dates ON calendar_dates.service_id = trips.service_id
    WHERE calendar_dates.date = $date
      AND stop_times.stop_id = $stop_id
      AND stop_times.departure_time >= $departure_time
      AND trips.route_id = $route_id
      AND trips.trip_headsign = $trip_headsign
`;

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

  const { trip_id } = findOneBySql<IStopTime>(
    SQL_QUERY,
    { ...req.query, date: Number(date), departure_time: getCurrentSeconds() },
  );

  const vehiclePosition = getVehiclePositions({ trip_id });

  res.send(vehiclePosition);
});

export default router;
