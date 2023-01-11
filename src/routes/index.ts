import express from 'express';

import transportsRouter from './transports.js';
import stopsRouter from './stops.js';
import routesRouter from './routes.js';

const router = express.Router();

router.use('/transports', transportsRouter);
router.use('/stops', stopsRouter);
router.use('/routes', routesRouter);

export default router;
