import Sequelize from 'sequelize';
import sql from '../sql';

let PokeApiData = sql.define('pokeapidata', {
        number: {
            type: Sequelize.DataTypes.INTEGER,
            field: 'number',
            primaryKey: true
        },
        description: {
            type: Sequelize.DataTypes.STRING,
            field: 'description'
        }
    }, {
        freezeTableName: true
});

export default PokeApiData;