import 'reflect-metadata';
import { Connection, createConnection, EntityManager, getConnection } from 'typeorm';

export class Conn {
  static conn: Connection | null = null

  static getDBConnection = async (): Promise<EntityManager> => {
    if (Conn.conn == null) {
      Conn.conn = (await createConnection())
    }
    return getConnection().manager
  }
}