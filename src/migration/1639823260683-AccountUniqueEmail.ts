import {MigrationInterface, QueryRunner} from "typeorm";

export class AccountUniqueEmail1639823260683 implements MigrationInterface {
    name = 'AccountUniqueEmail1639823260683'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_61a78d8668d7310e4f3d53caed7"`);
        await queryRunner.query(`ALTER TABLE "comment" RENAME COLUMN "soundsId" TO "soundId"`);
        await queryRunner.query(`ALTER TABLE "comment" RENAME CONSTRAINT "REL_61a78d8668d7310e4f3d53caed" TO "UQ_3133ebf74dff1d2c46610fe43e5"`);
        await queryRunner.query(`ALTER TABLE "sound" ADD "cdn_id" character varying(1000) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "sound" ADD "stream_id" character varying(1000) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "account" ADD CONSTRAINT "UQ_4c8f96ccf523e9a3faefd5bdd4c" UNIQUE ("email")`);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_3133ebf74dff1d2c46610fe43e5" FOREIGN KEY ("soundId") REFERENCES "sound"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_3133ebf74dff1d2c46610fe43e5"`);
        await queryRunner.query(`ALTER TABLE "account" DROP CONSTRAINT "UQ_4c8f96ccf523e9a3faefd5bdd4c"`);
        await queryRunner.query(`ALTER TABLE "sound" DROP COLUMN "stream_id"`);
        await queryRunner.query(`ALTER TABLE "sound" DROP COLUMN "cdn_id"`);
        await queryRunner.query(`ALTER TABLE "comment" RENAME CONSTRAINT "UQ_3133ebf74dff1d2c46610fe43e5" TO "REL_61a78d8668d7310e4f3d53caed"`);
        await queryRunner.query(`ALTER TABLE "comment" RENAME COLUMN "soundId" TO "soundsId"`);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_61a78d8668d7310e4f3d53caed7" FOREIGN KEY ("soundsId") REFERENCES "sound"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
