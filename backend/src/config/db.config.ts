import type { Dialect } from "sequelize";
import { Sequelize } from 'sequelize'

const dbConfig = {
    HOST: "host.docker.internal",
    USER: "postgres",
    PASSWORD: "",
    DB: "albumwall",
    dialect: "postgres" as Dialect,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
};
console.log(dbConfig);
const sequelizeConnection = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

export default sequelizeConnection