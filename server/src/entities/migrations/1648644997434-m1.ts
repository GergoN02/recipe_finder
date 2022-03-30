import {MigrationInterface, QueryRunner} from "typeorm";

export class m11648644997434 implements MigrationInterface {
    name = 'm11648644997434'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "user_name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_d34106f8ec1ebaf66f4f8609dd6" UNIQUE ("user_name"), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_saved_recipes" ("user_id" integer NOT NULL, "recipe_id" integer NOT NULL, CONSTRAINT "PK_945cc61f1a5f6314aeb88f412d4" PRIMARY KEY ("user_id", "recipe_id"))`);
        await queryRunner.query(`CREATE TABLE "recipe" ("id" SERIAL NOT NULL, "recipe_author" integer NOT NULL, "recipe_name" character varying NOT NULL, "recipe_desc" character varying NOT NULL, "ingredients" text array NOT NULL, "quantities" text array NOT NULL, "recipe_img" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_e365a2fedf57238d970e07825ca" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "recipe_tags" ("recipe_id" integer NOT NULL, "tag_id" integer NOT NULL, CONSTRAINT "PK_01345664192b9ae436dfb055aa3" PRIMARY KEY ("recipe_id", "tag_id"))`);
        await queryRunner.query(`CREATE TABLE "tag" ("id" SERIAL NOT NULL, "tag_name" character varying NOT NULL, "tag_desc" character varying, CONSTRAINT "UQ_c567d5f21442789d3fb85a53f07" UNIQUE ("tag_name"), CONSTRAINT "PK_8e4052373c579afc1471f526760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user_saved_recipes" ADD CONSTRAINT "FK_09c1a552e056d905067fd22712f" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_saved_recipes" ADD CONSTRAINT "FK_e17133ceae835778cd1896425bd" FOREIGN KEY ("recipe_id") REFERENCES "recipe"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "recipe_tags" ADD CONSTRAINT "FK_debe611aa6b0e4876f0c6ec77a9" FOREIGN KEY ("recipe_id") REFERENCES "recipe"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "recipe_tags" ADD CONSTRAINT "FK_03a9973d20215e31676a3d90937" FOREIGN KEY ("tag_id") REFERENCES "tag"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "recipe_tags" DROP CONSTRAINT "FK_03a9973d20215e31676a3d90937"`);
        await queryRunner.query(`ALTER TABLE "recipe_tags" DROP CONSTRAINT "FK_debe611aa6b0e4876f0c6ec77a9"`);
        await queryRunner.query(`ALTER TABLE "user_saved_recipes" DROP CONSTRAINT "FK_e17133ceae835778cd1896425bd"`);
        await queryRunner.query(`ALTER TABLE "user_saved_recipes" DROP CONSTRAINT "FK_09c1a552e056d905067fd22712f"`);
        await queryRunner.query(`DROP TABLE "tag"`);
        await queryRunner.query(`DROP TABLE "recipe_tags"`);
        await queryRunner.query(`DROP TABLE "recipe"`);
        await queryRunner.query(`DROP TABLE "user_saved_recipes"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
