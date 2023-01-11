import express, { Request, Response } from 'express';

import { findAllBySql } from '../gtfsService.js';
import getCurrentSeconds from '../utils/time.js';

const router = express.Router();

const SQL_QUERY = `
  SELECT stop_times.trip_id, stop_times.departure_time, trips.route_id FROM stop_times
    INNER JOIN trips ON stop_times.trip_id = trips.trip_id
    INNER JOIN calendar_dates ON calendar_dates.service_id = trips.service_id
    WHERE calendar_dates.date = $date
      AND stop_times.stop_id = $stop_id
      AND stop_times.departure_timestamp >= $departure_timestamp
    ORDER BY stop_times.arrival_time
`;

interface IVehicleLocationRequest extends Request {
  query: {
    date: string;
    stop_id: string;
  }
}

router.get('/', async (req: IVehicleLocationRequest, res: Response) => {
  const { date, stop_id } = req.query;

  const stopTimes = findAllBySql(
    SQL_QUERY,
    { stop_id, date: Number(date), departure_timestamp: getCurrentSeconds() },
  );

  res.send(stopTimes);
});

export default router;
