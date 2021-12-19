import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm"
import { Account } from "./Account";
import { DBObject } from "./DBObject";
import { Sound } from "./Sound";

@Entity()
export class EmailVerification extends DBObject {
  @PrimaryGeneratedColumn("uuid")
  id: string | undefined;

  @Column({type: "varchar", length: 5000})
  @Index()
  email: string | undefined;

  @Column({type: "text" })
  token: string| undefined;
}