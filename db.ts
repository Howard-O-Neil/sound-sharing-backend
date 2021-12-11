import "reflect-metadata"
import { createConnection } from "@/node_modules/typeorm/index";

createConnection().then(connection => {
  // here you can start to work with your entities
}).catch(error => console.log(error));