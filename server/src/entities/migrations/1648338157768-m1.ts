import {MigrationInterface, QueryRunner} from "typeorm";

export class m11648338157768 implements MigrationInterface {
    name = 'm11648338157768'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "cuisine" ("id" SERIAL NOT NULL, "cuisine_name" character varying NOT NULL, "cuisine_location" character varying, CONSTRAINT "UQ_9f0f4c643630e3c1e87f3c181dd" UNIQUE ("cuisine_name"), CONSTRAINT "PK_d4c1e9427b94335350fecaf238e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "diet" ("id" SERIAL NOT NULL, "diet_name" character varying NOT NULL, "diet_desc" character varying, CONSTRAINT "UQ_059993cb037a9a627cfb35c8574" UNIQUE ("diet_name"), CONSTRAINT "PK_f9d0f2b67d1c9bcaa6736f4cebd" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "category" ("id" SERIAL NOT NULL, "category_name" character varying NOT NULL, "category_desc" character varying, CONSTRAINT "UQ_9359e3b1d5e90d7a0fbe3b28077" UNIQUE ("category_name"), CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "recipe" DROP COLUMN "recipe_cat"`);
        await queryRunner.query(`ALTER TABLE "recipe" ADD "cuisineId" integer`);
        await queryRunner.query(`ALTER TABLE "recipe" ADD "categoryId" integer`);
        await queryRunner.query(`ALTER TABLE "recipe" ADD "dietId" integer`);
        await queryRunner.query(`ALTER TABLE "recipe" DROP CONSTRAINT "UQ_deeb7b038f9a71eb4ea45b93a3e"`);
        await queryRunner.query(`ALTER TABLE "recipe" ALTER COLUMN "recipe_img" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "recipe" ADD CONSTRAINT "FK_c360c5e45705d714d87e28a0ca6" FOREIGN KEY ("cuisineId") REFERENCES "cuisine"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "recipe" ADD CONSTRAINT "FK_991484dd8189182dafe91e44413" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "recipe" ADD CONSTRAINT "FK_e65f153ef81804c4adffd04300e" FOREIGN KEY ("dietId") REFERENCES "diet"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "recipe" DROP CONSTRAINT "FK_e65f153ef81804c4adffd04300e"`);
        await queryRunner.query(`ALTER TABLE "recipe" DROP CONSTRAINT "FK_991484dd8189182dafe91e44413"`);
        await queryRunner.query(`ALTER TABLE "recipe" DROP CONSTRAINT "FK_c360c5e45705d714d87e28a0ca6"`);
        await queryRunner.query(`ALTER TABLE "recipe" ALTER COLUMN "recipe_img" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "recipe" ADD CONSTRAINT "UQ_deeb7b038f9a71eb4ea45b93a3e" UNIQUE ("recipe_name")`);
        await queryRunner.query(`ALTER TABLE "recipe" DROP COLUMN "dietId"`);
        await queryRunner.query(`ALTER TABLE "recipe" DROP COLUMN "categoryId"`);
        await queryRunner.query(`ALTER TABLE "recipe" DROP COLUMN "cuisineId"`);
        await queryRunner.query(`ALTER TABLE "recipe" ADD "recipe_cat" character varying NOT NULL`);
        await queryRunner.query(`DROP TABLE "category"`);
        await queryRunner.query(`DROP TABLE "diet"`);
        await queryRunner.query(`DROP TABLE "cuisine"`);
    }

}
