import express, { Request, Response } from 'express';

import { getStops } from '../gtfsService.js';

const router = express.Router();

const REQUIRED_STOPS_FIELDS = [
  'stop_id',
  'stop_name',
  'stop_lat',
  'stop_lon',
];

/**
 * @openapi
 * components:
 *   schemas:
 *     Stop:
 *       type: object
 *       properties:
 *         stop_id:
 *           type: string
 *           description: Stop ID
 *         stop_name:
 *           type: string
 *           description: Stop name
 *         stop_lat:
 *           type: string
 *           description: Stop latitude
 *         stop_lon:
 *           type: string
 *           description: Stop longitude
 *       example:
 *         stop_id: 101001
 *         stop_name: Śliwice 01
 *         stop_lat: 52.278146
 *         stop_lon: 21.011972
 * tags:
 *   name: Stops

 * /api/stops:
 *   get:
 *     description: Get all stops
 *     tags: [Stops]
 *     responses:
 *       200:
 *         description: Lists of stops
 *         content:
 *           application/json:
 *            schema:
 *              type: array
 *              items:
 *               $ref: '#/components/schemas/Stop'
 */
router.get('/', async (_req: Request, res: Response) => {
  const stops = getStops({}, REQUIRED_STOPS_FIELDS);

  res.send(stops);
});

export default router;
