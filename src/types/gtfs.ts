import { SqlWhere } from 'gtfs';

export type TGTFSEntity = 'stop_times';

export interface TStopTime {
  trip_id: string
  departure_time: string
  departure_timestamp: number
}

export interface TVehiclePositionQuery extends SqlWhere {
  date: number
  stop_id: string
  route_id: string
  trip_headsign: string
}
