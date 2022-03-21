import {MigrationInterface, QueryRunner} from "typeorm";

export class m11647456095165 implements MigrationInterface {
    name = 'm11647456095165'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "recipe" ADD CONSTRAINT "UQ_deeb7b038f9a71eb4ea45b93a3e" UNIQUE ("recipe_name")`);
        await queryRunner.query(`ALTER TABLE "recipe" DROP CONSTRAINT "UQ_e08189da4010538df14669533c4"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "recipe" ADD CONSTRAINT "UQ_e08189da4010538df14669533c4" UNIQUE ("recipe_cat")`);
        await queryRunner.query(`ALTER TABLE "recipe" DROP CONSTRAINT "UQ_deeb7b038f9a71eb4ea45b93a3e"`);
    }

}
