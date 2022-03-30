import {MigrationInterface, QueryRunner} from "typeorm";

export class m11648599595751 implements MigrationInterface {
    name = 'm11648599595751'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "recipe_diet" DROP CONSTRAINT "FK_c4a60ad806bd0adbceb85d5c8be"`);
        await queryRunner.query(`ALTER TABLE "recipe_category" DROP CONSTRAINT "FK_c0e3a030dd5983358535c4982c7"`);
        await queryRunner.query(`ALTER TABLE "recipe_diet" DROP CONSTRAINT "PK_efee557b8829b859810ae248deb"`);
        await queryRunner.query(`ALTER TABLE "recipe_diet" ADD CONSTRAINT "PK_5fd266bf29ca18b8d79210e15ee" PRIMARY KEY ("diet_id", "recipe_id")`);
        await queryRunner.query(`ALTER TABLE "recipe_diet" DROP COLUMN "recipe_id_dc"`);
        await queryRunner.query(`ALTER TABLE "recipe_category" DROP CONSTRAINT "PK_8e4583d0e1b56519dedf8621777"`);
        await queryRunner.query(`ALTER TABLE "recipe_category" ADD CONSTRAINT "PK_c4f7da99f60a0932883bfb46410" PRIMARY KEY ("category_id", "recipe_id")`);
        await queryRunner.query(`ALTER TABLE "recipe_category" DROP COLUMN "recipe_id_cc"`);
        await queryRunner.query(`ALTER TABLE "recipe_diet" ADD CONSTRAINT "FK_e0d27ce4885a8f0a9925b1a1c4e" FOREIGN KEY ("recipe_id") REFERENCES "recipe"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "recipe_category" ADD CONSTRAINT "FK_494efbd76164060ab9e624fb6ee" FOREIGN KEY ("recipe_id") REFERENCES "recipe"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "recipe_category" DROP CONSTRAINT "FK_494efbd76164060ab9e624fb6ee"`);
        await queryRunner.query(`ALTER TABLE "recipe_diet" DROP CONSTRAINT "FK_e0d27ce4885a8f0a9925b1a1c4e"`);
        await queryRunner.query(`ALTER TABLE "recipe_category" ADD "recipe_id_cc" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "recipe_category" DROP CONSTRAINT "PK_c4f7da99f60a0932883bfb46410"`);
        await queryRunner.query(`ALTER TABLE "recipe_category" ADD CONSTRAINT "PK_8e4583d0e1b56519dedf8621777" PRIMARY KEY ("category_id", "recipe_id", "recipe_id_cc")`);
        await queryRunner.query(`ALTER TABLE "recipe_diet" ADD "recipe_id_dc" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "recipe_diet" DROP CONSTRAINT "PK_5fd266bf29ca18b8d79210e15ee"`);
        await queryRunner.query(`ALTER TABLE "recipe_diet" ADD CONSTRAINT "PK_efee557b8829b859810ae248deb" PRIMARY KEY ("diet_id", "recipe_id", "recipe_id_dc")`);
        await queryRunner.query(`ALTER TABLE "recipe_category" ADD CONSTRAINT "FK_c0e3a030dd5983358535c4982c7" FOREIGN KEY ("recipe_id_cc") REFERENCES "recipe"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "recipe_diet" ADD CONSTRAINT "FK_c4a60ad806bd0adbceb85d5c8be" FOREIGN KEY ("recipe_id_dc") REFERENCES "recipe"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
