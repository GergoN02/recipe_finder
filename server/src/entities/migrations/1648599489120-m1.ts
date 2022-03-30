import {MigrationInterface, QueryRunner} from "typeorm";

export class m11648599489120 implements MigrationInterface {
    name = 'm11648599489120'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "recipe" DROP CONSTRAINT "FK_923e54e5144515b62b3480515b4"`);
        await queryRunner.query(`ALTER TABLE "recipe" DROP CONSTRAINT "FK_872bad35d56edd437a4bad127bf"`);
        await queryRunner.query(`CREATE TABLE "recipe_diet" ("diet_id" integer NOT NULL, "recipe_id" integer NOT NULL, "recipe_id_dc" integer NOT NULL, CONSTRAINT "PK_efee557b8829b859810ae248deb" PRIMARY KEY ("diet_id", "recipe_id", "recipe_id_dc"))`);
        await queryRunner.query(`CREATE TABLE "recipe_category" ("category_id" integer NOT NULL, "recipe_id" integer NOT NULL, "recipe_id_cc" integer NOT NULL, CONSTRAINT "PK_8e4583d0e1b56519dedf8621777" PRIMARY KEY ("category_id", "recipe_id", "recipe_id_cc"))`);
        await queryRunner.query(`ALTER TABLE "recipe" DROP COLUMN "cat_id"`);
        await queryRunner.query(`ALTER TABLE "recipe" DROP COLUMN "diet_id"`);
        await queryRunner.query(`ALTER TABLE "recipe_diet" ADD CONSTRAINT "FK_b28626fd1383fa9cbdffab4089c" FOREIGN KEY ("diet_id") REFERENCES "diet"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "recipe_diet" ADD CONSTRAINT "FK_c4a60ad806bd0adbceb85d5c8be" FOREIGN KEY ("recipe_id_dc") REFERENCES "recipe"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "recipe_category" ADD CONSTRAINT "FK_9f683b1e651da3285cba27aa687" FOREIGN KEY ("category_id") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "recipe_category" ADD CONSTRAINT "FK_c0e3a030dd5983358535c4982c7" FOREIGN KEY ("recipe_id_cc") REFERENCES "recipe"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "recipe_category" DROP CONSTRAINT "FK_c0e3a030dd5983358535c4982c7"`);
        await queryRunner.query(`ALTER TABLE "recipe_category" DROP CONSTRAINT "FK_9f683b1e651da3285cba27aa687"`);
        await queryRunner.query(`ALTER TABLE "recipe_diet" DROP CONSTRAINT "FK_c4a60ad806bd0adbceb85d5c8be"`);
        await queryRunner.query(`ALTER TABLE "recipe_diet" DROP CONSTRAINT "FK_b28626fd1383fa9cbdffab4089c"`);
        await queryRunner.query(`ALTER TABLE "recipe" ADD "diet_id" integer`);
        await queryRunner.query(`ALTER TABLE "recipe" ADD "cat_id" integer`);
        await queryRunner.query(`DROP TABLE "recipe_category"`);
        await queryRunner.query(`DROP TABLE "recipe_diet"`);
        await queryRunner.query(`ALTER TABLE "recipe" ADD CONSTRAINT "FK_872bad35d56edd437a4bad127bf" FOREIGN KEY ("diet_id") REFERENCES "diet"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "recipe" ADD CONSTRAINT "FK_923e54e5144515b62b3480515b4" FOREIGN KEY ("cat_id") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
