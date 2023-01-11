import {
  importGtfs,
  openDb,
  updateGtfsRealtime,
  advancedQuery,
  getVehiclePositions,
  getStops,
  ImportConfig,
  SqlWhere,
  SqlResults,
  AdvancedQueryOptions,
} from 'gtfs';

import fs from 'fs';

import { GTFS_ENTITIES, BASE_GTFS_QUERY } from './const/gtfs.js';
import {
  GtfsRequestParams, IStopTime, IVehiclePositionQuery, TGTFSEntity
} from './types/gtfs.js';
import getCurrentSeconds from './utils/time.js';

class GTFSService {
  private readonly config: ImportConfig;

  constructor(config: ImportConfig) {
    this.config = config;
  }

  async syncDb(): Promise<void> {
    await importGtfs(this.config);
  }

  async buildAndPrepareDb(): Promise<void> {
    const isDbExists: boolean = this.config.sqlitePath
      ? fs.existsSync(this.config.sqlitePath)
      : false;

    if (!isDbExists) {
      await this.syncDb();
    }

    const db = await openDb(this.config);

    if (!isDbExists) {
      db.exec('CREATE INDEX stop_times_stop_id_trip_id_index ON stop_times(stop_id, trip_id);');
      db.exec('CREATE INDEX routes_route_id_index ON routes(route_id);');
      db.exec('CREATE INDEX trips_trip_id ON trips(trip_id);');
    }
  }

  async syncRealtimeData(): Promise<void> {
    await updateGtfsRealtime(this.config);
  }

  getStops(requestParams: GtfsRequestParams) {
    const {
      query, fields, sortBy, options,
    } = requestParams;

    return getStops(query, fields, sortBy, options);
  }

  async getRoutes(stop_id: string) {
    const db = await openDb(this.config);

    return db.prepare(
      'SELECT DISTINCT(routes.route_id) FROM routes INNER JOIN trips ON routes.route_id = trips.route_id INNER JOIN stop_times ON trips.trip_id = stop_times.trip_id WHERE stop_times.stop_id = $stop_id',
    ).all({ stop_id });
  }

  async getVehiclePosition(query: IVehiclePositionQuery): Promise<SqlResults> {
    const stopTimes = this.queryEntities<IStopTime[]>(GTFS_ENTITIES.STOP_TIMES, query);

    const { trip_id } = stopTimes.find(({ departure_timestamp }) => (
      departure_timestamp >= getCurrentSeconds()
    )) ?? {};

    return getVehiclePositions({ trip_id });
  }

  private queryEntities<T>(entity: TGTFSEntity, query: SqlWhere, options?: AdvancedQueryOptions): T {
    const baseQuery = BASE_GTFS_QUERY.get(entity) ?? {};

    return advancedQuery(entity, { ...baseQuery, ...options, query }) as T;
  }
}

export default GTFSService;
