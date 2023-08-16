import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1692183904870 implements MigrationInterface {
    name = 'Init1692183904870'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "orders" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "source" character varying, "destination" character varying, "orderType" character varying, "createdBy" character varying NOT NULL, "phoneNumber" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "PK_710e2d4957aa5878dfe94e4ac2f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "order-transactions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "historyId" integer NOT NULL, "historyDate" TIMESTAMP NOT NULL, "status" character varying NOT NULL, "acceptedAt" TIMESTAMP NOT NULL, "cancelledAt" TIMESTAMP NOT NULL, "completedAt" TIMESTAMP NOT NULL, "feedback" character varying NOT NULL, CONSTRAINT "PK_da1ace332eb4fe9179cd02b5e97" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "drivers" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "firstName" character varying, "lastName" character varying, "email" character varying NOT NULL, "phoneNumber" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "PK_92ab3fb69e566d3eb0cae896047" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "admin" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "firstName" character varying, "lastName" character varying, "email" character varying NOT NULL, "password" character varying NOT NULL, "role" character varying NOT NULL DEFAULT 'USER', CONSTRAINT "PK_e032310bcef831fb83101899b10" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "firstName" character varying, "lastName" character varying, "email" character varying NOT NULL, "phoneNumber" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "admin"`);
        await queryRunner.query(`DROP TABLE "drivers"`);
        await queryRunner.query(`DROP TABLE "order-transactions"`);
        await queryRunner.query(`DROP TABLE "orders"`);
    }

}
