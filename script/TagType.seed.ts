import "reflect-metadata"
import { TagType } from "@/src/entity/TagType";
import { Conn } from "@/connection";

const listType: TagType[] = []
let idx = 0

listType.push(new TagType()); idx++
listType[idx - 1].name = "Type"

listType.push(new TagType()); idx++
listType[idx - 1].name = "Timbre"

listType.push(new TagType()); idx++
listType[idx - 1].name = "Genre"

listType.push(new TagType()); idx++
listType[idx - 1].name = "Articulation"

listType.push(new TagType()); idx++
listType[idx - 1].name = "Character"

listType.push(new TagType()); idx++
listType[idx - 1].name = "Emotional"

const func = async () => {
  (await Conn.getDBConnection()).save(listType)
}
func()