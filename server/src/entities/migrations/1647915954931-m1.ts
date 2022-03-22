import {MigrationInterface, QueryRunner} from "typeorm";

export class m11647915954931 implements MigrationInterface {
    name = 'm11647915954931'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TYPE "public"."user_user_type_enum" RENAME TO "user_user_type_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."user_user_type_enum" AS ENUM('admin', 'regular', 'ghost')`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "user_type" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "user_type" TYPE "public"."user_user_type_enum" USING "user_type"::"text"::"public"."user_user_type_enum"`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "user_type" SET DEFAULT 'regular'`);
        await queryRunner.query(`DROP TYPE "public"."user_user_type_enum_old"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."user_user_type_enum_old" AS ENUM('admin', 'employee', 'ghost')`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "user_type" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "user_type" TYPE "public"."user_user_type_enum_old" USING "user_type"::"text"::"public"."user_user_type_enum_old"`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "user_type" SET DEFAULT 'ghost'`);
        await queryRunner.query(`DROP TYPE "public"."user_user_type_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."user_user_type_enum_old" RENAME TO "user_user_type_enum"`);
    }

}
