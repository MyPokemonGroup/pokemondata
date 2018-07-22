import Sequelize from "sequelize";
import sql from "../sql";

const BastionApiData = sql.define("image", {
  number: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  image: {
    type: Sequelize.STRING
  }
});

export default BastionApiData;
