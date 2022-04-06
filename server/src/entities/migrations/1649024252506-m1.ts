import {MigrationInterface, QueryRunner} from "typeorm";

export class m11649024252506 implements MigrationInterface {
    name = 'm11649024252506'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "recipe" DROP COLUMN "recipe_name"`);
        await queryRunner.query(`ALTER TABLE "recipe" DROP COLUMN "recipe_img"`);
        await queryRunner.query(`ALTER TABLE "recipe" ADD "recipe_title" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "recipe" ADD "external_author" character varying`);
        await queryRunner.query(`ALTER TABLE "recipe" ADD "prep_time_minutes" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "recipe" ADD "cook_time_minutes" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "recipe" ADD "total_time_minutes" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "recipe" ADD "footnotes" text array`);
        await queryRunner.query(`ALTER TABLE "recipe" ADD "original_url" character varying`);
        await queryRunner.query(`ALTER TABLE "recipe" ADD "photo_url" character varying`);
        await queryRunner.query(`ALTER TABLE "recipe" ADD "rating_stars" integer`);
        await queryRunner.query(`ALTER TABLE "recipe" ADD "review_count" integer`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "recipe" DROP COLUMN "review_count"`);
        await queryRunner.query(`ALTER TABLE "recipe" DROP COLUMN "rating_stars"`);
        await queryRunner.query(`ALTER TABLE "recipe" DROP COLUMN "photo_url"`);
        await queryRunner.query(`ALTER TABLE "recipe" DROP COLUMN "original_url"`);
        await queryRunner.query(`ALTER TABLE "recipe" DROP COLUMN "footnotes"`);
        await queryRunner.query(`ALTER TABLE "recipe" DROP COLUMN "total_time_minutes"`);
        await queryRunner.query(`ALTER TABLE "recipe" DROP COLUMN "cook_time_minutes"`);
        await queryRunner.query(`ALTER TABLE "recipe" DROP COLUMN "prep_time_minutes"`);
        await queryRunner.query(`ALTER TABLE "recipe" DROP COLUMN "external_author"`);
        await queryRunner.query(`ALTER TABLE "recipe" DROP COLUMN "recipe_title"`);
        await queryRunner.query(`ALTER TABLE "recipe" ADD "recipe_img" character varying`);
        await queryRunner.query(`ALTER TABLE "recipe" ADD "recipe_name" character varying NOT NULL`);
    }

}
