import { MigrationInterface, QueryRunner } from "typeorm";

export class AddProductsQuantityColumn1690468133395
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query("ALTER TABLE products ADD COLUMN quantity NUMERIC;");
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query("ALTER TABLE products DROP COLUMN quantity;");
  }
}
