import express from 'express';

import vehiclesRouter from './vehicles.js';
import stopsRouter from './stops.js';
import stopTimesRouter from './stop_times.js';
import routesRouter from './routes.js';

const router = express.Router();

router.use('/vehicles', vehiclesRouter);
router.use('/stops', stopsRouter);
router.use('/stop_times', stopTimesRouter);
router.use('/routes', routesRouter);

export default router;
