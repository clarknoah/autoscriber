import { Connection, EntityManager, IDatabaseDriver, MikroORM } from "@mikro-orm/core";
import { PostgreSqlDriver, SqlEntityManager } from "@mikro-orm/postgresql";
import ormOptions from "orm.config";
import { User } from "resources/index";
import { logger } from "util/logger";


export const populateDemoUser = async (em: SqlEntityManager<PostgreSqlDriver> & EntityManager<IDatabaseDriver<Connection>>) => {
  const exists = await em.findOne(User, { firstname: "Demo" });
  if (exists) {
    return exists;
  }
  
  const user = new User({
    firstname: "Demo",
    lastname: "User",
  });
  em.persist(user);

  const loadedUser = await em.findOne(User, { firstname: "Demo" });
  return loadedUser;
};


export default async function initializeDatabase() {
  try {
    logger.info("Initializing ORM connection...");
    const orm = await MikroORM.init<PostgreSqlDriver>(ormOptions);
    // auto migrate database schema
    await orm.getMigrator().up();
    const migrator = orm.getMigrator();
    const migrations = await migrator.getPendingMigrations();
    if (migrations && migrations.length > 0) {
      await migrator.up();
    }
   // await populateDemoUser(orm);
    return orm;
  } catch (err: any) {
    logger.error("Mikro-ORM Failed to initialize", err);
    process.exit(1);
  }
}
