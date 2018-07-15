import Sequelize from 'sequelize';
import sql from '../sql';

let PokeApiData = sql.define('pokeapidata', {
    description: {
        type: Sequelize.DataTypes.STRING,
        field: 'description'
    }
}, {
    freezeTableName: true
});

export default PokeApiData;