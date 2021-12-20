import { Conn } from "../connection";
import { Account } from "../entity/Account";
import { Collection } from "../entity/Collection";
import { Sound } from "../entity/Sound";
import { Tag } from "../entity/Tag";
import { ACCOUNT_ENDPOINT, app, APP_ENDPOINT, PUBLIC_ENDPOINT, SOUND_ENDPOINT } from "../main";
import { encodeToken } from "./Jwt.util";


app.get(`${APP_ENDPOINT}/${SOUND_ENDPOINT}/get`, async (req, res) => {
  res.status(200);
  res.send(JSON.stringify({
    status: true,
    sounds: (await getDashboard(Number.parseInt(req.query["offset"] as string)))[1],
    dbSize: await getSoundsSize(),
  }))
})

app.get(`${APP_ENDPOINT}/${SOUND_ENDPOINT}/search`, async (req, res) => {
  res.status(200);

  const [_, sounds, size] = await seachSound(Number.parseInt(req.query["offset"] as string), req.query["search"] as string)

  res.send(JSON.stringify({
    status: true,
    sounds: sounds,
    dbSize: size,
  }))
})

const getSoundsSize = async (): Promise<number> => {
  return await (await Conn.getDBConnection())
    .getRepository(Sound)
    .createQueryBuilder("s")
    .getCount();
}

const seachSound = async (offset: number, searchString: string): Promise<[number, Sound[], number]> => {
  const query = (await Conn.getDBConnection())
    .getRepository(Sound)
    .createQueryBuilder("s")
    .leftJoinAndSelect("s.account", "ac")
    .leftJoinAndSelect("s.collection", "c")
    .leftJoinAndSelect("s.tags", "t")
    .where("s.title ILIKE :tit", {tit: `%${searchString}%`})
    .orWhere("t.name ILIKE :tit2", {tit2: `%${searchString}%`})
    .orderBy("s.create_at", "DESC")

  const size = await query.getCount()
  const sounds = await query
    .skip(offset).take(8)
    .getMany();
  
  return [1, sounds, size]
}

const getDashboard = async (offset: number): Promise<[number, Sound[]]> => {
  const sounds = await (await Conn.getDBConnection())
    .getRepository(Sound)
    .createQueryBuilder("s")
    .leftJoinAndSelect("s.account", "ac")
    .leftJoinAndSelect("s.collection", "c")
    .leftJoinAndSelect("s.tags", "t")
    .orderBy("s.create_at", "DESC")
    .skip(offset).take(8)
    .getMany();

  return [1, sounds]
}

// const saveSounds = async (sound: Sound_t): Promise<[number]> => {
//   const user = await (await Conn.getDBConnection())
//     .getRepository(Account)
//     .createQueryBuilder("u")
//     .where("u.email = :email", { email: sound.email })
//     .getOne();

//   const collectionQuery = (await Conn.getDBConnection())
//     .getRepository(Collection)
//     .createQueryBuilder("c")
//     .leftJoinAndSelect("c.account", "ac")
//     .where("ac.email = :email", { email: sound.email });
  
//   if (sound.collection_id == "") {
//     collectionQuery.andWhere("c.name = :name", { name: "Your default playlist" })
//   } else {
//     collectionQuery.andWhere("c.id = :id", { id: sound.collection_id })
//   }

//   const collection = await collectionQuery.getOne();

//   const tags = await (await Conn.getDBConnection())
//     .getRepository(Tag)
//     .createQueryBuilder("t")
//     .where("t.id IN (:...ids)", { ids : sound.tag_ids})
//     .getMany();

//   const newSound = new Sound()
//   newSound.title = sound.title;
//   newSound.account = user;
//   newSound.collection = collection;
//   newSound.original_name = sound.original_name;
//   newSound.cdn_id = sound.cdn_id;
//   newSound.stream_id = sound.stream_id;
//   newSound.thumbnail = sound.thumbnail;
//   newSound.tags = tags;

//   await (await Conn.getDBConnection()).save(newSound);

//   return [1]
// }