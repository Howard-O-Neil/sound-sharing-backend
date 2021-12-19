import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm"
import { DBObject } from "./DBObject";
import { Sound } from "./Sound";
import { TagType } from "./TagType";

@Entity()
export class Tag extends DBObject {
  @PrimaryGeneratedColumn("uuid")
  id: string | undefined;

  @Column({type: "varchar", length: 500})
  name: string | undefined;

  @ManyToOne(() => TagType)
  @JoinColumn()
  tag_type: TagType | undefined;

  constructor(name: string, type: TagType | undefined) {
    super()
    this.name = name
    this.tag_type = type
  }
}