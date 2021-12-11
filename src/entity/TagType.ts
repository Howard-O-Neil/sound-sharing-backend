import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { DBObject } from "./DBObject";

@Entity()
export class TagType extends DBObject {
  @PrimaryGeneratedColumn("uuid")
  id: string | undefined;

  @Column({type: "varchar", length: 500})
  name: string | undefined;
}