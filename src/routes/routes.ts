import express, { Request, Response } from 'express';

import { findAllBySql } from '../gtfsService.js';

const router = express.Router();

const SQL_QUERY = `
  SELECT DISTINCT(routes.route_id) FROM routes
    INNER JOIN trips ON routes.route_id = trips.route_id
    INNER JOIN stop_times ON trips.trip_id = stop_times.trip_id
    WHERE stop_times.stop_id = $stop_id;
`;

interface IRoutesRequest extends Request {
  query: {
    stop_id: string;
  }
}

/**
 * @openapi
 * components:
 *   schemas:
 *     Route:
 *       type: object
 *       properties:
 *         route_id:
 *           type: string
 *           description: Route ID
 *       example:
 *         id: 78
 * tags:
 *   name: Routes

 * /api/routes:
 *   get:
 *     description: Get all routes for specific stop
 *     tags: [Routes]
 *     parameters:
 *       - in: query
 *         name: stop_id
 *         schema:
 *           type: string
 *         required: true
 *         description: The stop id
 *     responses:
 *       200:
 *         description: Lists of routes
 *         content:
 *           application/json:
 *            schema:
 *              type: array
 *              items:
 *               $ref: '#/components/schemas/Route'
 */
router.get('/', async (req: IRoutesRequest, res: Response) => {
  const routes = findAllBySql(SQL_QUERY, { stop_id: req.query.stop_id });

  res.send(routes);
});

export default router;
