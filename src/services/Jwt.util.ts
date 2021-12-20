import * as jwt from "jsonwebtoken";
import * as fs from "fs";

const JWT_KEY = fs.readFileSync("./jwtRS256.key", {encoding: "utf-8"});

export const encodeToken = (data: any, timeInSec: number) => {

  return jwt.sign(data, JWT_KEY as string, 
    { algorithm: 'RS256',
      expiresIn: timeInSec})
}

export const encodeTokenNoSecret = (data: any, timeInSec: number) => {
  return jwt.sign(data, "abcd1234")
}

export const verifyToken = (token: any) : [jwt.JwtPayload | string | null, Error | null] => {
  let payload: jwt.JwtPayload | string | null = null;

  try {
    payload = jwt.verify(token, JWT_KEY as string, { algorithms: ['RS256'] });
  } catch (e: any) {
    if (e.name == "TokenExpiredError") {
      const newErr = new Error()
      newErr.name = "TokenExpiredError";

      return [null, newErr]
    }
  } finally {
    // always execute regardless of the result
  }

  return [payload , null];
}

export const decodeToken = (token: any) : [jwt.JwtPayload | string | null, Error | null] => {
  let payload: jwt.JwtPayload | string | null = null;
  payload = jwt.decode(token);

  return [payload , null];
}