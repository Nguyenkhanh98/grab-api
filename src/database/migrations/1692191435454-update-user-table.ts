import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateUserTable1692191435454 implements MigrationInterface {
    name = 'UpdateUserTable1692191435454'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "email" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "email" SET NOT NULL`);
    }

}
