import "reflect-metadata"
import { createConnection } from "typeorm"

createConnection().then(connection => {
  // connection.manager.release()
}).catch(error => console.log(error));