import {MigrationInterface, QueryRunner} from "typeorm";

export class AddComment1639341176170 implements MigrationInterface {
    name = 'AddComment1639341176170'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "comment" ("create_at" TIMESTAMP NOT NULL DEFAULT now(), "update_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "content" character varying(5000) NOT NULL, "accountId" uuid, "soundsId" uuid, CONSTRAINT "REL_454cbc3ab248f142c461934f55" UNIQUE ("accountId"), CONSTRAINT "REL_61a78d8668d7310e4f3d53caed" UNIQUE ("soundsId"), CONSTRAINT "PK_0b0e4bbc8415ec426f87f3a88e2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_454cbc3ab248f142c461934f551" FOREIGN KEY ("accountId") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_61a78d8668d7310e4f3d53caed7" FOREIGN KEY ("soundsId") REFERENCES "sound"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_61a78d8668d7310e4f3d53caed7"`);
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_454cbc3ab248f142c461934f551"`);
        await queryRunner.query(`DROP TABLE "comment"`);
    }

}
