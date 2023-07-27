import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateMovementsTable1690466287140 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(
      `CREATE TABLE movements (id TEXT PRIMARY KEY,
        user_id TEXT,
        product_id TEXT,
        quantity NUMERIC,
        date DATE,
        leftover BOOLEAN,
        CONSTRAINT fk_users FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
        CONSTRAINT fk_products FOREIGN KEY (product_id) REFERENCES products (id) ON DELETE CASCADE)`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query("DROP TABLE movements");
  }
}
