import cron from 'node-cron';

import { syncDb, syncRealtimeData } from './gtfsService.js';

export default () => {
  cron.schedule('0 1 * * *', (): void => {
    syncDb();
  });

  cron.schedule('*/5 * * * * *', (): void => {
    syncRealtimeData();
  });
};
