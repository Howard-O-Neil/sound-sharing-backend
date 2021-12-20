import express from 'express';
import cors from 'cors';
import { decodeToken, verifyToken } from './services/Jwt.util';
import { Conn } from './connection';
import { Account } from './entity/Account';
import { JwtPayload } from 'jsonwebtoken';

require('dotenv').config() // load env

export const app = express();
export const APP_ENDPOINT = "/sound-sharing/v1"
export const PUBLIC_ENDPOINT = "/sound-sharing-pub/v1"
export const ACCOUNT_ENDPOINT = "account"
export const SOUND_ENDPOINT = "sound"

app.use(express.json())
app.use(cors())

app.use(PUBLIC_ENDPOINT, (_req, _res, next) => {
  next()
})

app.use(APP_ENDPOINT, async (req, res, next) => {
  
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1] // remove "bearer"

  if (token == null) return res.sendStatus(401)
  else {
    const [acc, _err] = verifyToken(token)

    console.log(acc);

    const user = await (await Conn.getDBConnection())
      .getRepository(Account)
      .createQueryBuilder("user")
      .where("user.id = :id", {id: (acc as JwtPayload)["id"]})
      .getOne()

    if (user == undefined) {
      res.sendStatus(401);
    } else {
      req.body["user-id"] = user.id;
      next();
    }
  }
})

const port = 3002;

import "./services" // side effects only
import { exit } from 'process';

app.get('/', (_, res) => {
  res.send('Sound Sharing Backend API');
});

app.listen(port)