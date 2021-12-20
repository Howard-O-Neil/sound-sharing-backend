import { Conn } from "../connection";
import { Account } from "../entity/Account";
import { Collection } from "../entity/Collection";
import { Sound } from "../entity/Sound";
import { Tag } from "../entity/Tag";
import { ACCOUNT_ENDPOINT, app, APP_ENDPOINT, PUBLIC_ENDPOINT, SOUND_ENDPOINT } from "../main";
import { encodeToken } from "./Jwt.util";

interface Sound_t {
  title: string;
  original_name: string;
  thumbnail: string;
  cdn_id: string;
  stream_id: string;
  collection_id: string;
  email: string;
  tag_ids: string[];
}

app.post(`${APP_ENDPOINT}/${SOUND_ENDPOINT}/submit`, async (req, res) => {
  await saveSounds(req.body);

  res.status(200);
  res.send(JSON.stringify({
    status: true,
  }))
})

const saveSounds = async (sound: Sound_t): Promise<[number]> => {
  const user = await (await Conn.getDBConnection())
    .getRepository(Account)
    .createQueryBuilder("u")
    .where("u.email = :email", { email: sound.email })
    .getOne();

  const collectionQuery = (await Conn.getDBConnection())
    .getRepository(Collection)
    .createQueryBuilder("c")
    .leftJoinAndSelect("c.account", "ac")
    .where("ac.email = :email", { email: sound.email });
  
  if (sound.collection_id == "") {
    collectionQuery.andWhere("c.name = :name", { name: "Your default playlist" })
  } else {
    collectionQuery.andWhere("c.id = :id", { id: sound.collection_id })
  }

  const collection = await collectionQuery.getOne();

  const tags = await (await Conn.getDBConnection())
    .getRepository(Tag)
    .createQueryBuilder("t")
    .where("t.id IN (:...ids)", { ids : sound.tag_ids})
    .getMany();

  const newSound = new Sound()
  newSound.title = sound.title;
  newSound.account = user;
  newSound.collection = collection;
  newSound.original_name = sound.original_name;
  newSound.cdn_id = sound.cdn_id;
  newSound.stream_id = sound.stream_id;
  newSound.thumbnail = sound.thumbnail;
  newSound.tags = tags;

  await (await Conn.getDBConnection()).save(newSound);

  return [1]
}