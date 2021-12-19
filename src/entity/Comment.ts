import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm"
import { Account } from "./Account";
import { DBObject } from "./DBObject";
import { Sound } from "./Sound";

@Entity()
@Index(["account", "sound"])
export class Comment extends DBObject {
  @PrimaryGeneratedColumn("uuid")
  id: string | undefined

  @Column({type: "varchar", length: 5000})
  content: string | undefined;

  @OneToOne(() => Account)
  @JoinColumn()
  @Index()
  account: Account| undefined

  @OneToOne(() => Sound)
  @JoinColumn()
  @Index()
  sound: Sound | undefined
}