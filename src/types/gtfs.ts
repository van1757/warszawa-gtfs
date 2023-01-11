import {
  SqlWhere, SqlSelect, SqlOrderBy, QueryOptions,
} from 'gtfs';

export type TGTFSEntity = 'stop_times' | 'routes';

export interface IStopTime {
  trip_id: string
  departure_time: string
  departure_timestamp: number
}

export interface IVehiclePositionQuery extends SqlWhere {
  date: number
  stop_id: string
  route_id: string
  trip_headsign: string
}

export interface GtfsRequestParams {
  query?: SqlWhere,
  fields?: SqlSelect,
  sortBy?: SqlOrderBy,
  options?: QueryOptions
}
