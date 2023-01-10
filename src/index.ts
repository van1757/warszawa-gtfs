import express from 'express';

import GTFSService from './gtfsService.js';
import config from './config.js';
import apiRouter from './routes/index.js';

const app = express();
const port = 4000;

app.use('/api', apiRouter);

app.listen(port, async () => {
  const gtfsService = new GTFSService(config);

  await gtfsService.syncDb();
  await gtfsService.openDb();

  console.log(`Example app listening on port ${port}`);
});
