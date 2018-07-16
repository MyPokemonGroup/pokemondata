import axios from 'axios';
import PokeApiData from './PokeApiData.js';

const getPokeApiCount = () => {
    return axios.get('https://pokeapi.co/api/v2/pokemon-species/')
        .then((response) => {
            return 5;//response.data.count;
        })
        .catch((error) => {
            return error;
        });
};

const isValidProperty = (obj, prop) => {
    return obj.hasOwnProperty(prop) && obj[prop];
};


const getPokeApiDescription = (species) => {
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

const getPokeApiDescriptions = (count) => {
    let promises = [];

    for (let i = 1; i <= count; i++) {
        promises.push(axios.get(`https://pokeapi.co/api/v2/pokemon-species/${i}`));
    }

    return promises;
};

const setPokeApiDescriptions = (promises) => {
    for (let i = 0; i < promises.length; i++) {
        let promise = promises[i];

        const sleep = (ms) => {
            return new Promise((resolve) => setTimeout(resolve, ms));
        };

        const saveDescription = (response) => {
            let { number, description } = getPokeApiDescription(response.data);
            PokeApiData.create({
                number,
                description
            });
        };

        promise
            .then(sleep((i+2)*3000))
            .then(saveDescription)
            .catch(error => {
                console.log(error);
            });
    }
};

const loadPokeApiData = () => {
    PokeApiData.sync({force: true}).then(() => {
        getPokeApiCount()
            .then(getPokeApiDescriptions)
            .then(setPokeApiDescriptions)
    });
};

export default loadPokeApiData();