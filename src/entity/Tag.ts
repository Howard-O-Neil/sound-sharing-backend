import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Tag {
  @PrimaryGeneratedColumn("uuid")
  id: string | undefined;

  @Column()
  name: string | undefined;
}