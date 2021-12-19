import {MigrationInterface, QueryRunner} from "typeorm";

export class ManySoundPerAccount1639835487563 implements MigrationInterface {
    name = 'ManySoundPerAccount1639835487563'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sound" DROP CONSTRAINT "FK_c35ba31cd7bd75ca672c5dc0611"`);
        await queryRunner.query(`ALTER TABLE "sound" DROP CONSTRAINT "REL_c35ba31cd7bd75ca672c5dc061"`);
        await queryRunner.query(`ALTER TABLE "sound" ADD CONSTRAINT "FK_c35ba31cd7bd75ca672c5dc0611" FOREIGN KEY ("accountId") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sound" DROP CONSTRAINT "FK_c35ba31cd7bd75ca672c5dc0611"`);
        await queryRunner.query(`ALTER TABLE "sound" ADD CONSTRAINT "REL_c35ba31cd7bd75ca672c5dc061" UNIQUE ("accountId")`);
        await queryRunner.query(`ALTER TABLE "sound" ADD CONSTRAINT "FK_c35ba31cd7bd75ca672c5dc0611" FOREIGN KEY ("accountId") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
