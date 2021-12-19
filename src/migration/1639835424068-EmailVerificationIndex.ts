import {MigrationInterface, QueryRunner} from "typeorm";

export class EmailVerificationIndex1639835424068 implements MigrationInterface {
    name = 'EmailVerificationIndex1639835424068'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE INDEX "IDX_3ffc9210f041753e837b29d9e5" ON "email_verification" ("email") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_3ffc9210f041753e837b29d9e5"`);
    }

}
