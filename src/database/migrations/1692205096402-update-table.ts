import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateTable1692205096402 implements MigrationInterface {
    name = 'UpdateTable1692205096402'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order-transactions" ADD "orderId" uuid`);
        await queryRunner.query(`ALTER TABLE "order-transactions" ADD CONSTRAINT "FK_7a973a17472e652120b6ca7e910" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order-transactions" DROP CONSTRAINT "FK_7a973a17472e652120b6ca7e910"`);
        await queryRunner.query(`ALTER TABLE "order-transactions" DROP COLUMN "orderId"`);
    }

}
