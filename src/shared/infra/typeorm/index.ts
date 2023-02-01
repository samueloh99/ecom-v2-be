import { createConnection } from "typeorm";

createConnection({
  type: "postgres",
  host: `${process.env.HOST_DB}`,
  port: 5432,
  username: `${process.env.USERNAME_DB}`,
  password: `${process.env.PASSWORD_DB}`,
  database: `${process.env.NAME_DB}`,
  entities: [`${process.env.ENTITIES_DB}`],
  migrations: [`${process.env.MIGRATIONS_DB}`],
  cli: {
    migrationsDir: `${process.env.CLI_DB}`,
  },
});
