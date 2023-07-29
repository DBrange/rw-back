import { MigrationInterface, QueryRunner } from "typeorm";

export class init1690603791171 implements MigrationInterface {
    name = 'init1690603791171'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "injured_info" DROP COLUMN "gender"`);
        await queryRunner.query(`CREATE TYPE "public"."injured_info_gender_enum" AS ENUM('MAN', 'WOMAN', 'OTHER')`);
        await queryRunner.query(`ALTER TABLE "injured_info" ADD "gender" "public"."injured_info_gender_enum" NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "injured_info" DROP COLUMN "gender"`);
        await queryRunner.query(`DROP TYPE "public"."injured_info_gender_enum"`);
        await queryRunner.query(`ALTER TABLE "injured_info" ADD "gender" character varying NOT NULL`);
    }

}
