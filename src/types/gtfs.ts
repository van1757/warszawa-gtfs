export enum WhereType {
  EQ,
  LIKE,
  GTOREQ,
}

export enum OrderByType {
  ASC = 'ASC',
  DESC = 'DESC',
}

export interface IWhereParams {
  column: string;
  value: string | number;
  type: WhereType;
}

export interface IOrderByParams {
  column: string;
  direction: OrderByType
}
