import { AdvancedQueryOptions } from 'gtfs';

import { TGTFSEntity } from '../types/gtfs.js';

const BASE_STOP_TIMES_QUERY: AdvancedQueryOptions = {
  orderBy: [['stop_times.departure_timestamp', 'ASC']],
  join: [
    {
      type: 'INNER',
      table: 'trips',
      on: 'stop_times.trip_id = trips.trip_id',
    },
    {
      type: 'INNER',
      table: 'calendar_dates',
      on: 'calendar_dates.service_id = trips.service_id',
    },
  ],
};

export const GTFS_ENTITIES: Record<string, TGTFSEntity> = {
  STOP_TIMES: 'stop_times',
};

export const BASE_GTFS_QUERY = new Map<TGTFSEntity, AdvancedQueryOptions>([
  [GTFS_ENTITIES.STOP_TIMES, BASE_STOP_TIMES_QUERY],
]);
