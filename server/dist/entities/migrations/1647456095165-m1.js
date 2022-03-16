"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.m11647456095165 = void 0;
class m11647456095165 {
    constructor() {
        this.name = 'm11647456095165';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "recipe" ADD CONSTRAINT "UQ_deeb7b038f9a71eb4ea45b93a3e" UNIQUE ("recipe_name")`);
        await queryRunner.query(`ALTER TABLE "recipe" DROP CONSTRAINT "UQ_e08189da4010538df14669533c4"`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "recipe" ADD CONSTRAINT "UQ_e08189da4010538df14669533c4" UNIQUE ("recipe_cat")`);
        await queryRunner.query(`ALTER TABLE "recipe" DROP CONSTRAINT "UQ_deeb7b038f9a71eb4ea45b93a3e"`);
    }
}
exports.m11647456095165 = m11647456095165;
//# sourceMappingURL=1647456095165-m1.js.map