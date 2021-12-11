import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "@/node_modules/typeorm/index";
import { Account } from "./Account";
import { Collection } from "./Collection";
import { DBObject } from "./DBObject";
import { Tag } from "./Tag";

@Entity()
export class Sound extends DBObject {
  @PrimaryGeneratedColumn("uuid")
  id: string | undefined;

  @Column({type: "varchar", length: 1000})
  original_name: string | undefined;

  @Column({type: "varchar", length: 1000})
  thumbnail: string | undefined;

  @ManyToOne(() => Collection)
  @JoinColumn()
  collection: Collection | undefined;

  @OneToOne(() => Account)
  @JoinColumn()
  account: Account | undefined

  @ManyToMany(() => Tag)
  @JoinTable()
  tags: Tag[] | undefined
}