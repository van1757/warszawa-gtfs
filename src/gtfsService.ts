import {
  importGtfs,
  openDb,
  updateGtfsRealtime,
  getVehiclePositions,
  SqlResults,
} from 'gtfs';

import fs from 'fs';

import config from './config/gtfs.js';
import { IOrderByParams, IWhereParams } from './types/gtfs.js';
import buildSqlQuery from './utils/sqlBuilder.js';

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

  db.pragma('journal_mode = WAL');
};

const syncRealtimeData = async (): Promise<void> => {
  await updateGtfsRealtime(config);
};

const findAllBySql = (
  baseSqlQuery: string,
  whereParams: IWhereParams[],
  orderByParams: IOrderByParams[] = [],
): SqlResults => {
  const db = openDb(config);

  const sqlQuery = buildSqlQuery(baseSqlQuery, whereParams, orderByParams);

  return db.prepare(sqlQuery).all() || [];
};

export {
  buildAndPrepareDb,
  findAllBySql,
  getVehiclePositions,
  syncDb,
  syncRealtimeData,
};
