import express, { Request, Response } from 'express';

import { getVehiclePositions } from '../gtfsService.js';

const router = express.Router();

interface IVehicleLocationRequest extends Request {
  query: {
    trip_id: string;
  }
}

/**
 * @openapi
 * components:
 *   schemas:
 *     Vehicle:
 *       type: object
 *       properties:
 *         update_id:
 *           type: string
 *           description: Update ID
 *         bearing:
 *           type: number
 *           format: float
 *           description: Direction that the vehicle is facing
 *         latitude:
 *           type: number
 *           format: float
 *           description: Vehicle latitude
 *         longitude:
 *           type: number
 *           format: float
 *           description: Vehicle longitude
 *         trip_id:
 *           type: string
 *           description: Trip ID
 *         vehicle_id:
 *           type: string
 *           description: Vehicle ID
 *         timestamp:
 *           type: string
 *           description: Last update timestamp
 *         isUpdated:
 *           type: boolean
 *           description: Is position updated
 *       example:
 *         update_id: V/78/7
 *         bearing: 95.65643310546876
 *         latitude: 52.278146
 *         longitude: 21.011972
 *         trip_id: RA230107/78/TZ-GOR1/DP/22.48_
 *         vehicle_id: V/78/7
 *         timestamp: 2023-01-11T21:49:33.000Z
 *         isUpdated: 1
 * tags:
 *   name: Vehicles

 * /api/vehicles:
 *   get:
 *     description: Get all stops
 *     tags: [Vehicles]
*     parameters:
 *       - in: query
 *         name: trip_id
 *         schema:
 *           type: string
 *         required: true
 *         description: Trip ID
 *     responses:
 *       200:
 *         description: Current vehicle position
 *         content:
 *           application/json:
 *            schema:
 *              items:
 *               $ref: '#/components/schemas/Vehicle'
 */
router.get('/', async (req: IVehicleLocationRequest, res: Response) => {
  const vehiclePosition = getVehiclePositions({ trip_id: req.query.trip_id })[0] || {};

  res.send(vehiclePosition);
});

export default router;
