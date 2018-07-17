import axios from 'axios';
import PokeApiData from './PokeApiData.js';

const getPokeApiCount = () => {
    return axios.get('https://pokeapi.co/api/v2/pokemon-species/')
        .then((response) => {
            return response.data.count;
        })
        .catch((error) => {
            return error;
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
    if (!data) {
        throw new Error('Unable to set null data');
    }
    let { number, description } = data;
    PokeApiData.create({
        number,
        description
    });
};

const getAndSetPokeApiData = (pokeNumber) => {
    return getPokeApiData(pokeNumber)
        .then(setPokeApiData)
        .catch((error) => getAndSetPokeApiData(pokeNumber));
};

const loadPokeApiData = () => {
    PokeApiData.sync({force: true}).then(() => {
        getPokeApiCount()
            .then((count) => {
                console.log(count);
                for (let i = 1; i <= count; i++) {
                        getAndSetPokeApiData(i);
                    }
                }
            )
    });
};

export default loadPokeApiData();