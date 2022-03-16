"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.m11647455294047 = void 0;
class m11647455294047 {
    constructor() {
        this.name = 'm11647455294047';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "recipe" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "recipe" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "recipe" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "recipe" DROP COLUMN "created_at"`);
    }
}
exports.m11647455294047 = m11647455294047;
//# sourceMappingURL=1647455294047-m1.js.map