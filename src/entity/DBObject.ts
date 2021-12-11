import { CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from "@/node_modules/typeorm/index";

export class DBObject {
  @CreateDateColumn()
  create_at: Date | undefined

  @UpdateDateColumn()
  update_at: Date | undefined

  @DeleteDateColumn()
  deleted_at: Date | undefined
}