import {MigrationInterface, QueryRunner} from "typeorm";

export class m11648635358843 implements MigrationInterface {
    name = 'm11648635358843'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "recipe_category" DROP CONSTRAINT "FK_494efbd76164060ab9e624fb6ee"`);
        await queryRunner.query(`ALTER TABLE "recipe_category" DROP CONSTRAINT "FK_9f683b1e651da3285cba27aa687"`);
        await queryRunner.query(`ALTER TABLE "recipe_diet" DROP CONSTRAINT "FK_b28626fd1383fa9cbdffab4089c"`);
        await queryRunner.query(`ALTER TABLE "recipe_diet" DROP CONSTRAINT "FK_e0d27ce4885a8f0a9925b1a1c4e"`);
        await queryRunner.query(`ALTER TABLE "recipe_category" ADD "recipeId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "recipe_category" DROP CONSTRAINT "PK_c4f7da99f60a0932883bfb46410"`);
        await queryRunner.query(`ALTER TABLE "recipe_category" ADD CONSTRAINT "PK_5dacb366da7a08855ff54569c1c" PRIMARY KEY ("category_id", "recipe_id", "recipeId")`);
        await queryRunner.query(`ALTER TABLE "recipe_category" ADD "categoryId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "recipe_category" DROP CONSTRAINT "PK_5dacb366da7a08855ff54569c1c"`);
        await queryRunner.query(`ALTER TABLE "recipe_category" ADD CONSTRAINT "PK_7f40d712ff00bc9ea98b106091a" PRIMARY KEY ("category_id", "recipe_id", "recipeId", "categoryId")`);
        await queryRunner.query(`ALTER TABLE "recipe_category" ADD CONSTRAINT "FK_8e2c8741a606a3eb15302bed707" FOREIGN KEY ("recipeId") REFERENCES "recipe"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "recipe_category" ADD CONSTRAINT "FK_a94ab495765ad778b0825031675" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "recipe_category" DROP CONSTRAINT "FK_a94ab495765ad778b0825031675"`);
        await queryRunner.query(`ALTER TABLE "recipe_category" DROP CONSTRAINT "FK_8e2c8741a606a3eb15302bed707"`);
        await queryRunner.query(`ALTER TABLE "recipe_category" DROP CONSTRAINT "PK_7f40d712ff00bc9ea98b106091a"`);
        await queryRunner.query(`ALTER TABLE "recipe_category" ADD CONSTRAINT "PK_5dacb366da7a08855ff54569c1c" PRIMARY KEY ("category_id", "recipe_id", "recipeId")`);
        await queryRunner.query(`ALTER TABLE "recipe_category" DROP COLUMN "categoryId"`);
        await queryRunner.query(`ALTER TABLE "recipe_category" DROP CONSTRAINT "PK_5dacb366da7a08855ff54569c1c"`);
        await queryRunner.query(`ALTER TABLE "recipe_category" ADD CONSTRAINT "PK_c4f7da99f60a0932883bfb46410" PRIMARY KEY ("category_id", "recipe_id")`);
        await queryRunner.query(`ALTER TABLE "recipe_category" DROP COLUMN "recipeId"`);
        await queryRunner.query(`ALTER TABLE "recipe_diet" ADD CONSTRAINT "FK_e0d27ce4885a8f0a9925b1a1c4e" FOREIGN KEY ("recipe_id") REFERENCES "recipe"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "recipe_diet" ADD CONSTRAINT "FK_b28626fd1383fa9cbdffab4089c" FOREIGN KEY ("diet_id") REFERENCES "diet"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "recipe_category" ADD CONSTRAINT "FK_9f683b1e651da3285cba27aa687" FOREIGN KEY ("category_id") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "recipe_category" ADD CONSTRAINT "FK_494efbd76164060ab9e624fb6ee" FOREIGN KEY ("recipe_id") REFERENCES "recipe"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
