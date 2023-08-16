import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateTable1692204687858 implements MigrationInterface {
    name = 'UpdateTable1692204687858'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "createdBy"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "phoneNumber"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "password"`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "status" character varying NOT NULL DEFAULT 'active'`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "userId" uuid`);
        await queryRunner.query(`ALTER TABLE "orders" ALTER COLUMN "source" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "orders" ALTER COLUMN "destination" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "orders" ALTER COLUMN "orderType" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "orders" ALTER COLUMN "orderType" SET DEFAULT 'normal'`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_151b79a83ba240b0cb31b2302d1" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_151b79a83ba240b0cb31b2302d1"`);
        await queryRunner.query(`ALTER TABLE "orders" ALTER COLUMN "orderType" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "orders" ALTER COLUMN "orderType" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "orders" ALTER COLUMN "destination" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "orders" ALTER COLUMN "source" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "status"`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "password" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "phoneNumber" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "createdBy" character varying NOT NULL`);
    }

}
