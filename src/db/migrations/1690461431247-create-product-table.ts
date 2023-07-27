import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateProductTable1690461431247 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(
      "CREATE TABLE products (id TEXT PRIMARY KEY, user_id TEXT, name TEXT, CONSTRAINT fk_users FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE)"
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query("DROP TABLE products");
  }
}
