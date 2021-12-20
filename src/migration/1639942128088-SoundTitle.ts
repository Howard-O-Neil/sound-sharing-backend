import {MigrationInterface, QueryRunner} from "typeorm";

export class SoundTitle1639942128088 implements MigrationInterface {
    name = 'SoundTitle1639942128088'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sound" ADD "title" character varying(1000) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sound" DROP COLUMN "title"`);
    }

}
