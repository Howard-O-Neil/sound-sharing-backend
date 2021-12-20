import { Column, Entity, Index, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm"
import { Account } from "./Account";
import { Collection } from "./Collection";
import { DBObject } from "./DBObject";
import { Tag } from "./Tag";

@Entity()
@Index(["account", "collection"])
export class Sound extends DBObject {
  @PrimaryGeneratedColumn("uuid")
  id: string | undefined;

  @Column({type: "varchar", length: 1000})
  original_name: string | undefined;

  @Column({type: "varchar", length: 1000})
  title: string | undefined;

  @Column({type: "varchar", length: 1000})
  thumbnail: string | undefined;

  @Column({type: "varchar", length: 1000})
  cdn_id: string | undefined;

  @Column({type: "varchar", length: 1000})
  stream_id: string | undefined;

  @ManyToOne(type => Collection, c => c.sounds)
  @JoinColumn() // create foreign key, point to collection
  @Index()
  collection: Collection | undefined;

  @ManyToOne(() => Account)
  @JoinColumn()
  @Index()
  account: Account | undefined

  @ManyToMany(() => Tag)
  @JoinTable()
  tags: Tag[] | undefined
}