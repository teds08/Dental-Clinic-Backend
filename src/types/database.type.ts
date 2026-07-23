import { Pool, PoolClient } from "pg";

export type Database = Pool | PoolClient;