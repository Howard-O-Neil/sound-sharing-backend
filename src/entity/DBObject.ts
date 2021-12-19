import { CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from "typeorm"

export class DBObject {
  @CreateDateColumn()
  create_at: Date | undefined

  @UpdateDateColumn()
  update_at: Date | undefined

  @DeleteDateColumn()
  deleted_at: Date | undefined
}