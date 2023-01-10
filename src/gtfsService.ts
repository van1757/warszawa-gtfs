import {
  importGtfs,
  openDb,
  updateGtfsRealtime,
  advancedQuery,
  getVehiclePositions,
  ImportConfig,
  SqlResults,
} from 'gtfs';

import { GTFS_ENTITIES, BASE_GTFS_QUERY } from './const/gtfs.js';
import { TStopTime, TVehiclePositionQuery, TGTFSEntity } from './types/gtfs.js';
import getCurrentSeconds from './utils/time.js';

class GTFSService {
  private readonly config: ImportConfig;

  constructor(config: ImportConfig) {
    this.config = config;
  }

  async openDb(): Promise<void> {
    await openDb(this.config);
  }

  async syncDb(): Promise<void> {
    await importGtfs(this.config);
  }

  async syncRealtimeData(): Promise<void> {
    await updateGtfsRealtime(this.config);
  }

  async getVehiclePosition(query: TVehiclePositionQuery): Promise<SqlResults> {
    const stopTimes = this.queryEntities<TStopTime[]>(GTFS_ENTITIES.STOP_TIMES, query);

    const { trip_id } = stopTimes.find(({ departure_timestamp }) => (
      departure_timestamp >= getCurrentSeconds()
    )) ?? {};

    return getVehiclePositions({ trip_id });
  }

  private queryEntities<T>(entity: TGTFSEntity, query: TVehiclePositionQuery): T {
    const baseQuery = BASE_GTFS_QUERY.get(entity) ?? {};

    return advancedQuery(entity, { ...baseQuery, query }) as T;
  }
}

export default GTFSService;
