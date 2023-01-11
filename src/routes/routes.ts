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
    id: string;
  }
}

router.get('/:id', async (req: IRoutesRequest, res: Response) => {
  const routes = findAllBySql(SQL_QUERY, { stop_id: req.params.id });

  res.send(routes);
});

export default router;
