const callFetch = require("../utils/fetch").callFetch;

/**
 * Asynchronous function that gets a Pokemon's info from (Bastion) Pokédex API
 * @param {number} pokemonNumber of the Pokemon
 * @returns {{name: string, imageUrl: string}} Pokemon's name and sprite URL
 */
async function getInfoFromBastion(pokemonNumber) {
  const url = `https://pokeapi.bastionbot.org/v1/pokemon/${pokemonNumber}`;
  const resp = await callFetch(url);
  const info = resp[0];

  const name = info["name"];
  const image = info["sprite"];

  return {
    name: name,
    imageUrl: image
  };
}

/**
 * Asynchronous function that gets a Pokemon's image from (Bastion) Pokédex API
 * @param {number} pokemonNumber of the Pokemon
 * @returns {string} Pokemon's image URL
 */
async function getImageFromBastion(pokemonNumber) {
  const url = `https://pokeapi.bastionbot.org/v1/pokemon/${pokemonNumber}`;
  const resp = await callFetch(url);
  return resp[0]["sprite"];
}

/**
 * Asynchronous function that gets a Pokemon's name from (Bastion) Pokédex API
 * @param {number} pokemonNumber of the Pokemon
 * @returns {string} Pokemon's name
 */
async function getNameFromBastion(pokemonNumber) {
  const url = `https://pokeapi.bastionbot.org/v1/pokemon/${pokemonNumber}`;
  const resp = await callFetch(url);
  return resp[0]["name"];
}

/* TEST */
async function test_getImage() {
  const string = await getImageFromBastion(1);
  console.log(`Output of getImageFromBastion(1):\n`, string);
}

async function test_getName() {
  const string = await getNameFromBastion(1);
  console.log(`Output of getNameFromBastion(1):\n`, string);
}

async function test_getInfo() {
  const obj = await getInfoFromBastion(1);
  console.log(`Output of getInfoFromBastion(1):\n`, obj);
}

test_getImage();
test_getName();
test_getInfo();
