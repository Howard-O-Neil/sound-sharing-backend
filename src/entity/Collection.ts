import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "@/node_modules/typeorm/index";
import { Account } from "./Account";
import { DBObject } from "./DBObject";

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
  account: Account| undefined
}