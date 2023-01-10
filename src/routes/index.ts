import express from 'express';

import transportRouter from './transport.js';

const router = express.Router();

router.use('/transport', transportRouter);

export default router;
