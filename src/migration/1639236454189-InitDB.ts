import {MigrationInterface, QueryRunner} from "typeorm";

export class InitDB1639236454189 implements MigrationInterface {
    name = 'InitDB1639236454189'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "account" ("create_at" TIMESTAMP NOT NULL DEFAULT now(), "update_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying(500) NOT NULL, "name" character varying(500) NOT NULL, "password" character varying(500) NOT NULL, CONSTRAINT "PK_54115ee388cdb6d86bb4bf5b2ea" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tag_type" ("create_at" TIMESTAMP NOT NULL DEFAULT now(), "update_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(500) NOT NULL, CONSTRAINT "PK_0829ee814cd10d5a337eaa07443" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tag" ("create_at" TIMESTAMP NOT NULL DEFAULT now(), "update_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(500) NOT NULL, "tagTypeId" uuid, CONSTRAINT "PK_8e4052373c579afc1471f526760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "sound" ("create_at" TIMESTAMP NOT NULL DEFAULT now(), "update_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "original_name" character varying(1000) NOT NULL, "thumbnail" character varying(1000) NOT NULL, "collectionId" uuid, "accountId" uuid, CONSTRAINT "REL_c35ba31cd7bd75ca672c5dc061" UNIQUE ("accountId"), CONSTRAINT "PK_042a7f5e448107b2fd0eb4dfe8c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "collection" ("create_at" TIMESTAMP NOT NULL DEFAULT now(), "update_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(500) NOT NULL, "img_url" character varying(500) NOT NULL, "accountId" uuid, CONSTRAINT "REL_cb6876c19a4d2ceec3a34e8f16" UNIQUE ("accountId"), CONSTRAINT "PK_ad3f485bbc99d875491f44d7c85" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "tag" ADD CONSTRAINT "FK_1c84215eb01fa457d0beeaee7fc" FOREIGN KEY ("tagTypeId") REFERENCES "tag_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sound" ADD CONSTRAINT "FK_a9335118bdc86d8f6f7dd2c69ee" FOREIGN KEY ("collectionId") REFERENCES "collection"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sound" ADD CONSTRAINT "FK_c35ba31cd7bd75ca672c5dc0611" FOREIGN KEY ("accountId") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "collection" ADD CONSTRAINT "FK_cb6876c19a4d2ceec3a34e8f169" FOREIGN KEY ("accountId") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "collection" DROP CONSTRAINT "FK_cb6876c19a4d2ceec3a34e8f169"`);
        await queryRunner.query(`ALTER TABLE "sound" DROP CONSTRAINT "FK_c35ba31cd7bd75ca672c5dc0611"`);
        await queryRunner.query(`ALTER TABLE "sound" DROP CONSTRAINT "FK_a9335118bdc86d8f6f7dd2c69ee"`);
        await queryRunner.query(`ALTER TABLE "tag" DROP CONSTRAINT "FK_1c84215eb01fa457d0beeaee7fc"`);
        await queryRunner.query(`DROP TABLE "collection"`);
        await queryRunner.query(`DROP TABLE "sound" CASCADE`);
        await queryRunner.query(`DROP TABLE "tag" CASCADE`);
        await queryRunner.query(`DROP TABLE "tag_type"`);
        await queryRunner.query(`DROP TABLE "account"`);
    }

}
