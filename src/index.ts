import express from 'express';
import swaggerJSdoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';
import bodyParser from 'body-parser';

import { buildAndPrepareDb } from './gtfsService.js';
import startCronSchedules from './cron.js';
import apiRouter from './routes/index.js';
import swaggerConfig from './config/swagger.js';

const app = express();
const port = process.env.PORT || 4000;
const specs = swaggerJSdoc(swaggerConfig);

app.use(bodyParser.json({ limit: '5mb' }));
app.use('/api', apiRouter);
app.use('/', swaggerUI.serve, swaggerUI.setup(specs));

app.listen(port, async () => {
  await buildAndPrepareDb();

  startCronSchedules();

  console.log(`Example app listening on port ${port}`);
});
