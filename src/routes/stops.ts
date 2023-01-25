import express, { Request, Response } from 'express';

import { findAllBySql } from '../gtfsService.js';
import { WhereType } from '../types/gtfs.js';

const router = express.Router();

const SQL_QUERY = 'SELECT stop_id, stop_name, stop_lat, stop_lon FROM stops';

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
router.get('/', async (req: Request, res: Response) => {
  const stops = findAllBySql(SQL_QUERY, [
    { column: 'stop_name', value: req.query.stop_name as string, type: WhereType.LIKE },
  ]);

  res.send(stops);
});

export default router;
