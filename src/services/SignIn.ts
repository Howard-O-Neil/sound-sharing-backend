import { Conn } from "../connection";
import { Account } from "../entity/Account";
import { ACCOUNT_ENDPOINT, app, APP_ENDPOINT, PUBLIC_ENDPOINT } from "../main";
import { encodeToken } from "./Jwt.util";

app.post(`${PUBLIC_ENDPOINT}/${ACCOUNT_ENDPOINT}/sign-in`, async (req, res) => {
  const query = await getAccount(req.body)

  if (query[0] == -1) {
    res.status(400)
    res.send(JSON.stringify({
      "error": "400",
      "message": "Account not existed",
    }))
  } else if (query[0] == 0) {
    res.status(400)
    res.send(JSON.stringify({
      "error": "400",
      "message": "Password is not corrected",
    }))
  } else if (query[0] == 1) {
    res.status(200)
    res.send(JSON.stringify({
      "status": true,
      "token": `${encodeToken({id: query[1]}, 7 * 24 * 60 * 60)}`
    }))
  }
})

interface SignInAccountInfo {
  email: string;
  password: string;
}

const getAccount = async (account: SignInAccountInfo): Promise<[number, String| undefined]> => {
  const user = await (await Conn.getDBConnection())
    .getRepository(Account)
    .createQueryBuilder("user")
    .where("user.email = :email", {email: account.email})
    .getOne()

  if (user == undefined) return [-1, ""];
  if (user.password == account.password) return [-1, user.id];
  else return [0, ""];
}