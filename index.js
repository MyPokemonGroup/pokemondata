const config = require("./config.json");
const Sequelize = require("sequelize");

const devConfig = config["development"];

const sequelize = new Sequelize(
  devConfig.database,
  devConfig.username,
  devConfig.password,
  devConfig
);

// Test the connection
sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch(err => {
    console.error("Unable to connect to the database:", err);
  });

// TODO: Actually do stuff with the DB connection
