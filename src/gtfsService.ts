import {
  importGtfs,
  openDb,
  updateGtfsRealtime,
  getStops,
  getVehiclePositions,
} from 'gtfs';

import fs from 'fs';

import config from './config.js';
import { TDBFindParams } from './types/gtfs.js';

const syncDb = async (): Promise<void> => {
  await importGtfs(config);
};

const buildAndPrepareDb = async (): Promise<void> => {
  const isDbExists: boolean = config.sqlitePath
    ? fs.existsSync(config.sqlitePath)
    : false;

  if (!isDbExists) {
    await syncDb();
  }

  const db = await openDb(config);

  if (!isDbExists) {
    db.exec('CREATE INDEX stop_times_stop_id_trip_id_index ON stop_times(stop_id, trip_id);');
    db.exec('CREATE INDEX routes_route_id_index ON routes(route_id);');
    db.exec('CREATE INDEX trips_trip_id ON trips(trip_id);');
  }
};

const syncRealtimeData = async (): Promise<void> => {
  await updateGtfsRealtime(config);
};

const findOneBySql = <T>(sqlQuery: string, params: TDBFindParams): T => {
  const db = openDb(config);

  return db.prepare(sqlQuery).get(params) || {} as T;
};

const findAllBySql = <T>(sqlQuery: string, params: TDBFindParams): T => {
  const db = openDb(config);

  return db.prepare(sqlQuery).all(params) || [] as T;
};

export {
  buildAndPrepareDb,
  findOneBySql,
  findAllBySql,
  getVehiclePositions,
  getStops,
  syncDb,
  syncRealtimeData,
};
