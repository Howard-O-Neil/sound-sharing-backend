import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { DBObject } from "./DBObject";

@Entity()
export class Account extends DBObject {
  @PrimaryGeneratedColumn("uuid")
  id: string | undefined

  @Column({type: "varchar", length: 500})
  email: string | undefined;

  @Column({type: "varchar", length: 500})
  name: string | undefined

  @Column({type: "varchar", length: 500})
  password: string | undefined
}