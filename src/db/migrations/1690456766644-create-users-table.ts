import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUsersTable1690456766644 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(
      "CREATE TABLE users (id TEXT PRIMARY KEY, email TEXT UNIQUE, password_hash TEXT)"
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query("DROP TABLE users");
  }
}
