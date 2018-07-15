const callFetch = require("../utils/fetch").callFetch;

/**
 * Asynchronous function that gets total Pokemon count from (Bastion) Pokédex API
 * @returns {number} Total count of Pokemon in the API
 */
async function getTotalPokemonCountFromBastion() {
  const url = "https://pokeapi.bastionbot.org/v1/pokemon/counts";
  const count = await callFetch(url);
  return count["total"];
}

/* TEST */
// async function test_getTotalPokemonCount() {
//   const count = await getTotalPokemonCountFromBastion();
//   console.log(count);
// }

// test_getTotalPokemonCount(); // Should be 807 (as of 07/14/2018.)
