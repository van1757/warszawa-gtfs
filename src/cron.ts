import cron from 'node-cron';

import GTFSService from './gtfsService.js';
import config from './config.js';

export default () => {
  const gtfsService = new GTFSService(config);

  cron.schedule('0 1 * * *', (): void => {
    gtfsService.syncDb();
  });

  cron.schedule('*/5 * * * * *', (): void => {
    gtfsService.syncRealtimeData();
  });
};
