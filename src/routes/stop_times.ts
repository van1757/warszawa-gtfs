import express, { Request, Response } from 'express';

import { findAllBySql } from '../gtfsService.js';
import getCurrentSeconds from '../utils/time.js';
import { WhereType, OrderByType } from '../types/gtfs.js';

const router = express.Router();

const SQL_QUERY = `
  SELECT stop_times.trip_id, stop_times.arrival_time, trips.route_id FROM stop_times
    INNER JOIN trips ON stop_times.trip_id = trips.trip_id
    INNER JOIN calendar_dates ON calendar_dates.service_id = trips.service_id
`;

interface IVehicleLocationRequest extends Request {
  query: {
    date: string;
    stop_id: string;
  }
}

/**
 * @openapi
 * components:
 *   schemas:
 *     StopTime:
 *       type: object
 *       properties:
 *         trip_id:
 *           type: string
 *           description: Trip ID
 *         arrival_time:
 *           type: string
 *           description: Vehicle arrival time
 *         route_id:
 *           type: string
 *           description: Route id
 *       example:
 *         trip_id: RA230107/26/TP-WIA/DP/21.55__
 *         arrival_time: 22:28:00
 *         route_id: 26
 * tags:
 *   name: StopTimes

 * /api/stop_times:
 *   get:
 *     description: Get all stop times for specific stop and date
 *     tags: [StopTimes]
 *     parameters:
 *       - in: query
 *         name: stop_id
 *         schema:
 *           type: string
 *         required: true
 *         description: The stop id
*       - in: query
 *         name: date
 *         schema:
 *           type: string
 *         required: true
 *         description: The date
 *     responses:
 *       200:
 *         description: Lists of stop times
 *         content:
 *           application/json:
 *            schema:
 *              type: array
 *              items:
 *               $ref: '#/components/schemas/StopTime'
 */
router.get('/', async (req: IVehicleLocationRequest, res: Response) => {
  const { date, stop_id } = req.query;

  const stopTimes = findAllBySql(SQL_QUERY, [
    { column: 'calendar_dates.date', value: Number(date), type: WhereType.EQ },
    { column: 'stop_times.stop_id', value: stop_id, type: WhereType.EQ },
    { column: 'stop_times.arrival_timestamp', value: getCurrentSeconds(), type: WhereType.GTOREQ },
  ], [
    { column: 'stop_times.arrival_timestamp', direction: OrderByType.ASC },
  ]);

  res.send(stopTimes);
});

export default router;
