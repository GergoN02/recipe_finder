import {MigrationInterface, QueryRunner} from "typeorm";

export class m11648698979210 implements MigrationInterface {
    name = 'm11648698979210'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "recipe" DROP CONSTRAINT "FK_1370c876f9d4a525a45a9b50d81"`);
        await queryRunner.query(`CREATE TABLE "recipe_authors" ("recipe_id" integer NOT NULL, "user_id" integer NOT NULL, CONSTRAINT "PK_be7e11d574a2069ebcf2fb62530" PRIMARY KEY ("recipe_id", "user_id"))`);
        await queryRunner.query(`CREATE TABLE "ingredient" ("id" SERIAL NOT NULL, "ingredient_name" character varying NOT NULL, "ingredient_qty" character varying, CONSTRAINT "PK_6f1e945604a0b59f56a57570e98" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "recipe_ingredients" ("recipe_id" integer NOT NULL, "ingredient_id" integer NOT NULL, CONSTRAINT "PK_90484480b3b2978068565ae2a2f" PRIMARY KEY ("recipe_id", "ingredient_id"))`);
        await queryRunner.query(`ALTER TABLE "recipe" DROP COLUMN "author_id"`);
        await queryRunner.query(`ALTER TABLE "recipe" DROP COLUMN "ingredients"`);
        await queryRunner.query(`ALTER TABLE "recipe" DROP COLUMN "quantities"`);
        await queryRunner.query(`ALTER TABLE "recipe" DROP COLUMN "authorId"`);
        await queryRunner.query(`ALTER TABLE "recipe_authors" ADD CONSTRAINT "FK_530dedf1543374d733c1ce8f524" FOREIGN KEY ("recipe_id") REFERENCES "recipe"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "recipe_authors" ADD CONSTRAINT "FK_53934d791a27a54d7ae46f33f1c" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "recipe_ingredients" ADD CONSTRAINT "FK_f240137e0e13bed80bdf64fed53" FOREIGN KEY ("recipe_id") REFERENCES "recipe"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "recipe_ingredients" ADD CONSTRAINT "FK_133545365243061dc2c55dc1373" FOREIGN KEY ("ingredient_id") REFERENCES "ingredient"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "recipe_ingredients" DROP CONSTRAINT "FK_133545365243061dc2c55dc1373"`);
        await queryRunner.query(`ALTER TABLE "recipe_ingredients" DROP CONSTRAINT "FK_f240137e0e13bed80bdf64fed53"`);
        await queryRunner.query(`ALTER TABLE "recipe_authors" DROP CONSTRAINT "FK_53934d791a27a54d7ae46f33f1c"`);
        await queryRunner.query(`ALTER TABLE "recipe_authors" DROP CONSTRAINT "FK_530dedf1543374d733c1ce8f524"`);
        await queryRunner.query(`ALTER TABLE "recipe" ADD "authorId" integer`);
        await queryRunner.query(`ALTER TABLE "recipe" ADD "quantities" text array NOT NULL`);
        await queryRunner.query(`ALTER TABLE "recipe" ADD "ingredients" text array NOT NULL`);
        await queryRunner.query(`ALTER TABLE "recipe" ADD "author_id" integer NOT NULL`);
        await queryRunner.query(`DROP TABLE "recipe_ingredients"`);
        await queryRunner.query(`DROP TABLE "ingredient"`);
        await queryRunner.query(`DROP TABLE "recipe_authors"`);
        await queryRunner.query(`ALTER TABLE "recipe" ADD CONSTRAINT "FK_1370c876f9d4a525a45a9b50d81" FOREIGN KEY ("authorId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
