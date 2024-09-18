import { env } from "config/globals";
import { Options, PostgreSqlDriver } from "@mikro-orm/postgresql";
import { entities } from "resources";

// import {

// } from "resources/models";

const ormOptions: Options = {
  forceUtcTimezone: true,
  clientUrl: env.DATABASE_URL,
  migrations: {
    path: `./${process.env.NODE_PATH || "src"}/migrations`,
    tableName: "migrations",
    transactional: true,
    disableForeignKeys: false,
  },
  tsNode: false,
  forceUndefined: true,
  entities,
  discovery: { disableDynamicFileAccess: false },
  driver: PostgreSqlDriver,
  // driverOptions: env.isEnv
  //   ? {
  //       connection: {
  //         ssl: {
  //           sslmode: "require",
  //           rejectUnauthorized: false,
  //         },
  //       },
  //     }
  //   : {},
};

export default ormOptions;
