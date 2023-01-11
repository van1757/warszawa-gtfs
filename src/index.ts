import express from 'express';

import { buildAndPrepareDb } from './gtfsService.js';
import startCronSchedules from './cron.js';
import apiRouter from './routes/index.js';

const app = express();
const port = process.env.PORT || 4000;

app.use('/api', apiRouter);

app.listen(port, async () => {
  await buildAndPrepareDb();

  startCronSchedules();

  console.log(`Example app listening on port ${port}`);
});
