import {MigrationInterface, QueryRunner} from "typeorm";

export class m11648646041005 implements MigrationInterface {
    name = 'm11648646041005'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tag" ADD "recipe" integer`);
        await queryRunner.query(`ALTER TABLE "tag" ADD CONSTRAINT "FK_470358bc7786c5571221bc1a286" FOREIGN KEY ("recipe") REFERENCES "recipe"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tag" DROP CONSTRAINT "FK_470358bc7786c5571221bc1a286"`);
        await queryRunner.query(`ALTER TABLE "tag" DROP COLUMN "recipe"`);
    }

}
