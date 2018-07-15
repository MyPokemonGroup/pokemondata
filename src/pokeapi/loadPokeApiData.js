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


const getPokeApiDescription = (species) => {
    if (!species || !isValidProperty(species, 'flavor_text_entries')) {
        return null;
    }

    let flavor_text_entries = species['flavor_text_entries'];

    for (let flavor_text_entry of flavor_text_entries) {
        if (isValidProperty(flavor_text_entry, 'language') &&
            isValidProperty(flavor_text_entry['language'], 'name') &&
            flavor_text_entry['language']['name'].toLowerCase() === 'en' &&
            isValidProperty(flavor_text_entry, 'flavor_text')) {
            return flavor_text_entry['flavor_text'];
        }
    }

    return null;
};

const getPokeApiDescriptions = (count) => {
    let promises = [];
    for (let i = 1; i <= count; i++) {
        promises.push(axios.get(`https://pokeapi.co/api/v2/pokemon-species/${count}`));
    }

    return axios.all(promises).then((response) => {
        return response.map((response) => {
            return getPokeApiDescription(response.data);
        });
    });
};

const setPokeApiDescriptions = (descriptions) => {
    for (let description of descriptions) {
        PokeApiData.sync({force: true}).then(() => {
            return PokeApiData.create({
                description
            });
        });
    }
};

const loadPokeApiData = () => {
    getPokeApiCount()
        .then(getPokeApiDescriptions)
        .then(setPokeApiDescriptions);
};

export default loadPokeApiData();