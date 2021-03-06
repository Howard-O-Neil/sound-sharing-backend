import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm"
import { Account } from "./Account";
import { DBObject } from "./DBObject";
import { Sound } from "./Sound";

@Entity()
export class Collection extends DBObject {
  @PrimaryGeneratedColumn("uuid")
  id: string | undefined

  @Column({type: "varchar", length: 500})
  name: string | undefined;

  @Column({type: "varchar", length: 500})
  img_url: string | undefined

  @OneToOne(() => Account)
  @JoinColumn()
  @Index()
  account: Account| undefined

  @OneToMany(type => Sound, s => s.collection)
  // @JoinColumn() no need, we have joined column in sound repository
  sounds: Sound[] | undefined
}