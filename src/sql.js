import Sequelize from "sequelize";
import * as config from "./config.json";

let sql = new Sequelize(
  config.development.database,
  config.development.username,
  config.development.password,
  {
    host: config.development.host,
    dialect: config.development.dialect
  }
);

export default sql;
