import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "@/node_modules/typeorm/index";
import { DBObject } from "./DBObject";
import { TagType } from "./TagType";

@Entity()
export class Tag extends DBObject {
  @PrimaryGeneratedColumn("uuid")
  id: string | undefined;

  @Column({type: "varchar", length: 500})
  name: string | undefined;

  @OneToOne(() => TagType)
  @JoinColumn()
  tag_type: TagType| undefined;
}