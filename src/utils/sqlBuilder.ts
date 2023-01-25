import { IOrderByParams, IWhereParams, WhereType } from '../types/gtfs.js';

type BuilderFunction = (queryParams: IWhereParams) => string;

const buildWhereQuery = ({ column, value }: IWhereParams) => `${column} = ${value}`;

const buildLikeQuery = ({ column, value }: IWhereParams) => `LOWER(${column}) LIKE LOWER('${value}%')`;

const buildGtOrEqQuery = ({ column, value }: IWhereParams) => `${column} >= ${value}`;

const QUERY_BUILDERS = new Map<WhereType, BuilderFunction>([
  [WhereType.EQ, buildWhereQuery],
  [WhereType.LIKE, buildLikeQuery],
  [WhereType.GTOREQ, buildGtOrEqQuery],
]);

const buildSqlQuery = (
  baseQuery: string,
  whereParams: IWhereParams[],
  orderByParams: IOrderByParams[],
): string => {
  let finalQuery = baseQuery;

  const whereQuery = whereParams.reduce((result: string[], parameter) => {
    const builder = QUERY_BUILDERS.get(parameter.type);

    return builder && parameter.value ? [...result, builder(parameter)] : result;
  }, []);

  const orderByQuery = orderByParams.reduce((result: string, parameter) => `${result} ${parameter.column} ${parameter.direction}`, '');

  if (whereQuery.length > 0) {
    finalQuery += ` WHERE ${whereQuery.join(' AND ')}`;
  }

  if (orderByQuery.length > 0) {
    finalQuery += ` ORDER BY ${orderByQuery}`;
  }

  return finalQuery;
};

export default buildSqlQuery;
