import { Conn } from "../connection";
import { Account } from "../entity/Account";
import { Tag } from "../entity/Tag";
import { ACCOUNT_ENDPOINT, app, APP_ENDPOINT, PUBLIC_ENDPOINT, SOUND_ENDPOINT } from "../main";
import { encodeToken } from "./Jwt.util";

interface TagType_t {
  id: string;
  name: string;
}

interface Tag_t {
  id: string;
  name: string;
  type: TagType_t;
}

app.get(`${PUBLIC_ENDPOINT}/${SOUND_ENDPOINT}/get-tags`, async (req, res) => {
  res.status(200);
  res.send(JSON.stringify({
    status: true,
    listTags: await getAllTag()
  }))
})

const getAllTag = async (): Promise<Tag_t[]> => {
  const tags = await (await Conn.getDBConnection())
    .getRepository(Tag)
    .createQueryBuilder("t")
    .leftJoinAndSelect("t.tag_type", "tt")
    .getMany();

  return tags.map(x => {
    const tt = x.tag_type;
    return {
      id: <string>x.id,
      name: <string>x.name,
      type: {
        id: <string>tt?.id,
        name:<string>tt?.name
      }
    }
  })
}