import { MigrationInterface, QueryRunner } from "typeorm";

export class m11648173718426 implements MigrationInterface {
    name = 'm11648173718426'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "user_name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_d34106f8ec1ebaf66f4f8609dd6" UNIQUE ("user_name"), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_saved_recipes" ("user_id" integer NOT NULL, "recipe_id" integer NOT NULL, CONSTRAINT "PK_945cc61f1a5f6314aeb88f412d4" PRIMARY KEY ("user_id", "recipe_id"))`);
        await queryRunner.query(`CREATE TABLE "recipe" ("id" SERIAL NOT NULL, "recipe_author" integer NOT NULL, "recipe_name" character varying NOT NULL, "recipe_desc" character varying NOT NULL, "recipe_cat" character varying NOT NULL, "ingredients" text array NOT NULL, "quantities" text array NOT NULL, "recipe_img" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_deeb7b038f9a71eb4ea45b93a3e" UNIQUE ("recipe_name"), CONSTRAINT "PK_e365a2fedf57238d970e07825ca" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user_saved_recipes" ADD CONSTRAINT "FK_09c1a552e056d905067fd22712f" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_saved_recipes" ADD CONSTRAINT "FK_e17133ceae835778cd1896425bd" FOREIGN KEY ("recipe_id") REFERENCES "recipe"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {

    }

}
