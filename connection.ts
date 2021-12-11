import 'reflect-metadata';
import { createConnection, getConnectionManager } from '@/node_modules/typeorm/index';
import * as fs from "fs"

const connectionManager = getConnectionManager();

export const ORMConnection = connectionManager.create(
  {
    "type": "postgres",
    "host": "128.0.2.2",
    "port": 5432,
    "username": "admin",
    "password": "admin",
    "database": "sound-sharing",
    "synchronize": true,
    "logging": false,
    "entities": [
       "src/entity/**/*.ts"
    ],
    "migrations": [
       "src/migration/**/*.ts"
    ],
    "subscribers": [
       "src/subscriber/**/*.ts"
    ]
 }
);