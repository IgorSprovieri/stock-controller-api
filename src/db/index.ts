import { DataSource } from "typeorm";

const { DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_DATABASE } = process.env;

const dataBase = new DataSource({
  type: "postgres",
  host: DB_HOST || "localhost",
  port: Number(DB_PORT) || 5432,
  username: DB_USERNAME || "docker",
  password: DB_PASSWORD || "docker",
  database: DB_DATABASE || "docker",
  entities: ["src/entities/**/*{.ts,.js}"],
  migrations: ["src/db/migrations/**/*{.ts,.js}"],
  synchronize: false,
  logging: false,
});

export { dataBase };
