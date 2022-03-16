"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.m11647441843132 = void 0;
class m11647441843132 {
    constructor() {
        this.name = 'm11647441843132';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "recipe" ("id" SERIAL NOT NULL, "recipe_name" character varying NOT NULL, "recipe_desc" character varying NOT NULL, "recipe_cat" character varying NOT NULL, "ingredients" text array NOT NULL, "quantities" text array NOT NULL, "recipe_img" character varying NOT NULL, CONSTRAINT "UQ_e08189da4010538df14669533c4" UNIQUE ("recipe_cat"), CONSTRAINT "PK_e365a2fedf57238d970e07825ca" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."user_user_type_enum" AS ENUM('admin', 'employee', 'ghost')`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "user_name" character varying NOT NULL, "password" character varying NOT NULL, "user_type" "public"."user_user_type_enum" NOT NULL DEFAULT 'ghost', CONSTRAINT "UQ_d34106f8ec1ebaf66f4f8609dd6" UNIQUE ("user_name"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TYPE "public"."user_user_type_enum"`);
        await queryRunner.query(`DROP TABLE "recipe"`);
    }
}
exports.m11647441843132 = m11647441843132;
//# sourceMappingURL=1647441843132-m1.js.map