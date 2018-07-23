import axios from 'axios';
import PokeApiData from './PokeApiData.js';
import sql from '../sql.js';
import Sequelize from 'sequelize';

const getPokeApiCount = () => {
    return axios.get('https://pokeapi.co/api/v2/pokemon-species/')
        .then((response) => {
            return response.data.count;
        })
        .catch((error) => {
            return error;
        });
};

const matchPokeApiDataCount = (count) => {
    return PokeApiData.count().then(c => {
        return count === c;
    });
};

const isValidProperty = (obj, prop) => {
    return obj.hasOwnProperty(prop) && obj[prop];
};


const filterApiData = (species) => {
    if (!species || !isValidProperty(species, 'id') || !isValidProperty(species, 'flavor_text_entries')) {
        return { number: null, description: null };
    }

    let flavor_text_entries = species['flavor_text_entries'];

    for (let flavor_text_entry of flavor_text_entries) {
        if (isValidProperty(flavor_text_entry, 'language') &&
        isValidProperty(flavor_text_entry['language'], 'name') &&
        flavor_text_entry['language']['name'].toLowerCase() === 'en' &&
        isValidProperty(flavor_text_entry, 'flavor_text')) {
            return { number: species['id'], description: flavor_text_entry['flavor_text'] };
        }
    }

    return { number: null, description: null };
};

const getPokeApiData = (pokeNumber) => {
    return axios.get(`https://pokeapi.co/api/v2/pokemon-species/${pokeNumber}`)
        .then(response => filterApiData(response.data));
};

const setPokeApiData = (data) => {
    if (!data || !data.number || !data.description) {
        throw new Error('Unable to set null data');
    }
    let { number, description } = data;
    PokeApiData
        .create({
            number,
            description
        })
        .catch((error) => {
            if (error.name === 'SequelizeUniqueConstraintError') {
                console.log(`Pokemon number ${number} already exists, 
                data not inserted.`);
            }
        });
};

const getAndSetPokeApiData = (pokeNumber, backOff = 1) => {
    return getPokeApiData(pokeNumber)
        .then(setPokeApiData)
        .catch(() => {
            setTimeout(() => {
                getAndSetPokeApiData(pokeNumber, backOff * 2)}
                , backOff * 5000
            );
        });
};

const loadPokeApiData = () => {
    PokeApiData.sync({force: true}).then(() => {
        getPokeApiCount()
            .then((count) => {
                for (let i = 1; i <= count; i++) {
                        getAndSetPokeApiData(i);
                    }
                }
            )
    });

    loadRemainingPokeApiData();
};


const loadRemainingPokeApiData = (done = false) => {
    if (done) {
        return;
    }
    let selectMissingData = "SELECT\n" +
        " CONCAT(z.expected, IF(z.got-1>z.expected, CONCAT(' ',z.got-1), '')) AS missing\n" +
        "FROM (\n" +
        " SELECT\n" +
        "  @rownum:=@rownum+1 AS expected,\n" +
        "  IF(@rownum=number, 0, @rownum:=number) AS got\n" +
        " FROM\n" +
        "  (SELECT @rownum:=0) AS a\n" +
        "  JOIN pokeapidata\n" +
        "  ORDER BY number\n" +
        " ) AS z\n" +
        "WHERE z.got!=0;";
    getPokeApiCount()
        .then(matchPokeApiDataCount).then((finished) => {
            if (!finished) {
                sql.query(selectMissingData, { type: Sequelize.QueryTypes.SELECT })
                    .then((missed) => {
                        console.log(missed);
                        for (let { missing } of missed) {
                            let range = missing.trim().split(' ');
                            if (range) {
                                if (range.length > 1) {
                                    for (let i = parseInt(range[0]); i <= parseInt(range[1]); i++) {
                                        getAndSetPokeApiData(i);
                                    }
                                } else {
                                    getAndSetPokeApiData(parseInt(range[0]));
                                }
                            }
                        }
                    });
            }
            return loadRemainingPokeApiData(finished);
        })
        .catch(() => {
            return loadRemainingPokeApiData();
        });
};

export default loadPokeApiData;