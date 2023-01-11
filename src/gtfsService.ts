import {
  importGtfs,
  openDb,
  updateGtfsRealtime,
  getStops,
  getStoptimes,
  getVehiclePositions,
  SqlResults,
} from 'gtfs';

import fs from 'fs';

import config from './config/gtfs.js';
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

  db.exec('CREATE INDEX IF NOT EXISTS stop_times_stop_id_trip_id_index ON stop_times(stop_id, trip_id);');
  db.exec('CREATE INDEX IF NOT EXISTS routes_route_id_index ON routes(route_id);');
  db.exec('CREATE INDEX IF NOT EXISTS trips_trip_id ON trips(trip_id);');
};

const syncRealtimeData = async (): Promise<void> => {
  await updateGtfsRealtime(config);
};

const findAllBySql = (sqlQuery: string, params: TDBFindParams): SqlResults => {
  const db = openDb(config);

  return db.prepare(sqlQuery).all(params) || [];
};

export {
  buildAndPrepareDb,
  findAllBySql,
  getVehiclePositions,
  getStops,
  getStoptimes,
  syncDb,
  syncRealtimeData,
};
