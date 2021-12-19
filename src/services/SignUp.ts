import e from "express";
import { Conn } from "../connection";
import { Account } from "../entity/Account";
import { EmailVerification } from "../entity/EmailVerification";
import { ACCOUNT_ENDPOINT, app, APP_ENDPOINT, PUBLIC_ENDPOINT } from "../main";
import { decodeToken, encodeToken, verifyToken } from "./Jwt.util";
import {v1 as uuidv1} from "uuid";
import { sendMail } from "./EmailSender.util";
import { exit } from "process";

app.post(`${PUBLIC_ENDPOINT}/${ACCOUNT_ENDPOINT}/sign-up`, async (req, res) => {
  if (req.body["password"] !== req.body["retypePassword"]) {
    res.status(400)
    res.send(JSON.stringify({
      "error": "400",
      "message": "Password not the same",
    }))
  }

  const query = await checkAccount(req.body)

  if (query[0] == -1) {
    res.status(400)
    res.send(JSON.stringify({
      "error": "400",
      "message": "Account already existed",
    }))
  } else {
    const key = uuidv1()
    await performEmailVerification(req.body, key)

    res.status(200)
    res.send(JSON.stringify({
      "status": true,
      "message": "Please verify your email",
    }))
  }
})

app.post(`${PUBLIC_ENDPOINT}/${ACCOUNT_ENDPOINT}/verify-email`, async (req, res) => {
  const verifyStatus = await verifyEmail(req.body["email"], req.body["key"])
  
  if (verifyStatus[0] == -1) {
    res.status(400)
    res.send(JSON.stringify({
      "error": "400",
      "message": "You doesn't have any pending account",
    }))
  } else if (verifyStatus[0] == -2) {
    res.status(400)
    res.send(JSON.stringify({
      "error": "400",
      "message": "Your code is expired, please request a new one",
    }))
  } else if (verifyStatus[0] == 0) {
    res.status(400)
    res.send(JSON.stringify({
      "error": "400",
      "message": "Wrong code!, please type your newest code in your email",
    }))
  }
  else {
    const query = await createAccount(verifyStatus[1] as SignUpAccountInfo)

    if (query[0] == -1) {
      res.status(400)
      res.send(JSON.stringify({
        "error": "400",
        "message": "Account already existed",
      }))
    } else {  
      res.status(200)
      res.send(JSON.stringify({
        "status": true,
        "message": "Ok, now you can sign-in",
      }))
    }
  }
})

app.post(`${PUBLIC_ENDPOINT}/${ACCOUNT_ENDPOINT}/resend-confirmation`, async (req, res) => {
  const key = uuidv1();
  const verifyStatus = await resendEmailVerification(req.body["email"], key);
  
  if (verifyStatus[0] == -1) {
    res.status(400)
    res.send(JSON.stringify({
      "error": "400",
      "message": "You doesn't have any pending account",
    }))
  } else if (verifyStatus[0] == 1) {
    await softDeleteEmailVerificationCaches(req.body["email"])

    res.status(200)
    res.send(JSON.stringify({
      "status": true,
      "message": "Please verify your email",
    }))
  } else {
    res.status(500)
    res.send(JSON.stringify({
      "error": 500,
      "message": "Internal server error",
    }))
  }
})


interface SignUpAccountInfo {
  email: string;
  password: string;
  retypePassword: string;
  name: string;
  avatar_url: string;
}

interface EmailVerificationInfo {
  email: string;
  code: string;
}

interface CachedAccountVerification {
  email: string;
  password: string;
  retypePassword: string;
  name: string;
  avatar_url: string;
  key: string;
}

const checkAccount = async (account: SignUpAccountInfo): Promise<[number, String| undefined]> => {
  const user = await (await Conn.getDBConnection())
    .getRepository(Account)
    .createQueryBuilder("user")
    .where("user.email = :email", {email: account.email})
    .getOne()

  if (user == undefined) {
    return [1, "ok"]
  }
  else {
    return [-1, ""]
  }
}

const createAccount = async (account: SignUpAccountInfo): Promise<[number, String| undefined]> => {
  const user = await (await Conn.getDBConnection())
    .getRepository(Account)
    .createQueryBuilder("user")
    .where("user.email = :email", {email: account.email})
    .getOne()

  if (user == undefined) {
    let newUser = new Account()
    newUser.email = account.email;
    newUser.password = account.password;
    newUser.name = account.name;

    newUser = await (await Conn.getDBConnection()).save(newUser);

    return [1, "ok"]
  }
  else {
    return [-1, ""]
  }
}

const softDeleteEmailVerificationCaches = async (email: string) => {
    await (await Conn.getDBConnection())
      .getRepository(EmailVerification)
      .createQueryBuilder("e")
      .where("e.email = :email", {email: email})
      .orderBy("e.create_at", 'DESC').softDelete();
}

const performEmailVerification = async (account: SignUpAccountInfo, key: string) => {
  let pendingEmailVerification = new EmailVerification()
  pendingEmailVerification.email = account.email

  const encodeData = {
    ...account,
    key
  }
  pendingEmailVerification.token = encodeToken(encodeData, 10 * 60)

  await (await Conn.getDBConnection()).save(pendingEmailVerification);

  sendMail({
    from: "cdnnvidia166@gmail.com",
    to: account.email,
    subject: "[SOUND SHARING] VERIFY EMAIL",
    text: `Your code is: ${key}`
  });
}

const resendEmailVerification = async (email: string, key: string): Promise<[number, CachedAccountVerification | null]> => {
  const emailVerifications = await (await Conn.getDBConnection())
    .getRepository(EmailVerification)
    .createQueryBuilder("e")
    .where("e.email = :email", {email: email})
    .orderBy("e.create_at", 'DESC')
    .getMany();

  if (emailVerifications == undefined || emailVerifications.length <= 0) {
    return [-1, null]
  }

  let [oldCached, _] = decodeToken(emailVerifications[0].token);
  let oldCached_t = <CachedAccountVerification>oldCached;
  oldCached_t.key = key;

  //@ts-ignore
  delete oldCached_t["iat"];
  //@ts-ignore
  delete oldCached_t["exp"];

  let pendingEmailVerification = new EmailVerification()
  pendingEmailVerification.email = oldCached_t.email

  pendingEmailVerification.token = encodeToken(oldCached_t, 10 * 60)

  await (await Conn.getDBConnection()).save(pendingEmailVerification);

  // await (await Conn.getDBConnection())
  //   .getRepository(EmailVerification)
  //   .createQueryBuilder("e")
  //   .where("e.email = :email", {email: account.email})
  //   .orderBy("e.create_at", 'DESC').softDelete(); // clear all old cached verification

  sendMail({
    from: "cdnnvidia166@gmail.com",
    to: email,
    subject: "[SOUND SHARING] VERIFY EMAIL",
    text: `Your code is: ${key}`
  });

  return [1, oldCached_t]
}

const verifyEmail = async (email: string, key: string): Promise<[number, CachedAccountVerification | null]> => {
  const emailVerificationsQuery = (await Conn.getDBConnection())
    .getRepository(EmailVerification)
    .createQueryBuilder("e")
    .where("e.email = :email", {email: email})
    .orderBy("e.create_at", 'DESC');

  const emailVerifications = await emailVerificationsQuery.getMany()

  if (emailVerifications == undefined || emailVerifications.length <= 0) {
    return [-1, null]
  }

  let [decodeObj, err] = verifyToken(emailVerifications[0].token);

  if (err != null && err.name == "TokenExpiredError") {
    return [-2, null]
  }

  if ((<CachedAccountVerification>decodeObj).key != key) return [0, null]
  else return [1, <CachedAccountVerification>decodeObj]
}