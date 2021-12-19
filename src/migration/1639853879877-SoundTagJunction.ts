import {MigrationInterface, QueryRunner} from "typeorm";

export class SoundTagJunction1639853879877 implements MigrationInterface {
    name = 'SoundTagJunction1639853879877'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "sound_tags_tag" ("soundId" uuid NOT NULL, "tagId" uuid NOT NULL, CONSTRAINT "PK_73dd923b8991143159dc519a7a2" PRIMARY KEY ("soundId", "tagId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_21e0dcf3703fa4988f294e258f" ON "sound_tags_tag" ("soundId") `);
        await queryRunner.query(`CREATE INDEX "IDX_0016c6573c02b480e1cf988f8a" ON "sound_tags_tag" ("tagId") `);
        await queryRunner.query(`ALTER TABLE "sound_tags_tag" ADD CONSTRAINT "FK_21e0dcf3703fa4988f294e258f2" FOREIGN KEY ("soundId") REFERENCES "sound"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "sound_tags_tag" ADD CONSTRAINT "FK_0016c6573c02b480e1cf988f8ac" FOREIGN KEY ("tagId") REFERENCES "tag"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sound_tags_tag" DROP CONSTRAINT "FK_0016c6573c02b480e1cf988f8ac"`);
        await queryRunner.query(`ALTER TABLE "sound_tags_tag" DROP CONSTRAINT "FK_21e0dcf3703fa4988f294e258f2"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_0016c6573c02b480e1cf988f8a"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_21e0dcf3703fa4988f294e258f"`);
        await queryRunner.query(`DROP TABLE "sound_tags_tag"`);
    }

}
