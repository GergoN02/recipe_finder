import {MigrationInterface, QueryRunner} from "typeorm";

export class m11648628398543 implements MigrationInterface {
    name = 'm11648628398543'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "recipe_diet" ("diet_id" integer NOT NULL, "recipe_id" integer NOT NULL, CONSTRAINT "PK_5fd266bf29ca18b8d79210e15ee" PRIMARY KEY ("diet_id", "recipe_id"))`);
        await queryRunner.query(`CREATE TABLE "diet" ("id" SERIAL NOT NULL, "diet_name" character varying NOT NULL, "diet_desc" character varying, CONSTRAINT "UQ_059993cb037a9a627cfb35c8574" UNIQUE ("diet_name"), CONSTRAINT "PK_f9d0f2b67d1c9bcaa6736f4cebd" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "user_name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_d34106f8ec1ebaf66f4f8609dd6" UNIQUE ("user_name"), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_saved_recipes" ("user_id" integer NOT NULL, "recipe_id" integer NOT NULL, CONSTRAINT "PK_945cc61f1a5f6314aeb88f412d4" PRIMARY KEY ("user_id", "recipe_id"))`);
        await queryRunner.query(`CREATE TABLE "recipe" ("id" SERIAL NOT NULL, "recipe_author" integer NOT NULL, "recipe_name" character varying NOT NULL, "recipe_desc" character varying NOT NULL, "ingredients" text array NOT NULL, "quantities" text array NOT NULL, "recipe_img" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_e365a2fedf57238d970e07825ca" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "recipe_category" ("category_id" integer NOT NULL, "recipe_id" integer NOT NULL, CONSTRAINT "PK_c4f7da99f60a0932883bfb46410" PRIMARY KEY ("category_id", "recipe_id"))`);
        await queryRunner.query(`CREATE TABLE "category" ("id" SERIAL NOT NULL, "category_name" character varying NOT NULL, "category_desc" character varying, CONSTRAINT "UQ_9359e3b1d5e90d7a0fbe3b28077" UNIQUE ("category_name"), CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "recipe_diet" ADD CONSTRAINT "FK_b28626fd1383fa9cbdffab4089c" FOREIGN KEY ("diet_id") REFERENCES "diet"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "recipe_diet" ADD CONSTRAINT "FK_e0d27ce4885a8f0a9925b1a1c4e" FOREIGN KEY ("recipe_id") REFERENCES "recipe"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_saved_recipes" ADD CONSTRAINT "FK_09c1a552e056d905067fd22712f" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_saved_recipes" ADD CONSTRAINT "FK_e17133ceae835778cd1896425bd" FOREIGN KEY ("recipe_id") REFERENCES "recipe"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "recipe_category" ADD CONSTRAINT "FK_494efbd76164060ab9e624fb6ee" FOREIGN KEY ("recipe_id") REFERENCES "recipe"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "recipe_category" ADD CONSTRAINT "FK_9f683b1e651da3285cba27aa687" FOREIGN KEY ("category_id") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "recipe_category" DROP CONSTRAINT "FK_9f683b1e651da3285cba27aa687"`);
        await queryRunner.query(`ALTER TABLE "recipe_category" DROP CONSTRAINT "FK_494efbd76164060ab9e624fb6ee"`);
        await queryRunner.query(`ALTER TABLE "user_saved_recipes" DROP CONSTRAINT "FK_e17133ceae835778cd1896425bd"`);
        await queryRunner.query(`ALTER TABLE "user_saved_recipes" DROP CONSTRAINT "FK_09c1a552e056d905067fd22712f"`);
        await queryRunner.query(`ALTER TABLE "recipe_diet" DROP CONSTRAINT "FK_e0d27ce4885a8f0a9925b1a1c4e"`);
        await queryRunner.query(`ALTER TABLE "recipe_diet" DROP CONSTRAINT "FK_b28626fd1383fa9cbdffab4089c"`);
        await queryRunner.query(`DROP TABLE "category"`);
        await queryRunner.query(`DROP TABLE "recipe_category"`);
        await queryRunner.query(`DROP TABLE "recipe"`);
        await queryRunner.query(`DROP TABLE "user_saved_recipes"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "diet"`);
        await queryRunner.query(`DROP TABLE "recipe_diet"`);
    }

}
