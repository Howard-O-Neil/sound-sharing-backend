import {MigrationInterface, QueryRunner} from "typeorm";

export class AddIndexTemporarySoundTagJunction1639850531598 implements MigrationInterface {
    name = 'AddIndexTemporarySoundTagJunction1639850531598'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "account" ADD "avatar_url" character varying(1000)`);
        await queryRunner.query(`CREATE INDEX "IDX_a9335118bdc86d8f6f7dd2c69e" ON "sound" ("collectionId") `);
        await queryRunner.query(`CREATE INDEX "IDX_c35ba31cd7bd75ca672c5dc061" ON "sound" ("accountId") `);
        await queryRunner.query(`CREATE INDEX "IDX_b97ed51d052be0d79b3214f446" ON "sound" ("accountId", "collectionId") `);
        await queryRunner.query(`CREATE INDEX "IDX_cb6876c19a4d2ceec3a34e8f16" ON "collection" ("accountId") `);
        await queryRunner.query(`CREATE INDEX "IDX_454cbc3ab248f142c461934f55" ON "comment" ("accountId") `);
        await queryRunner.query(`CREATE INDEX "IDX_3133ebf74dff1d2c46610fe43e" ON "comment" ("soundId") `);
        await queryRunner.query(`CREATE INDEX "IDX_67a5c5715d0a893108f7108340" ON "comment" ("accountId", "soundId") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_67a5c5715d0a893108f7108340"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_3133ebf74dff1d2c46610fe43e"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_454cbc3ab248f142c461934f55"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_cb6876c19a4d2ceec3a34e8f16"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_b97ed51d052be0d79b3214f446"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_c35ba31cd7bd75ca672c5dc061"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_a9335118bdc86d8f6f7dd2c69e"`);
        await queryRunner.query(`ALTER TABLE "account" DROP COLUMN "avatar_url"`);
    }

}
