import { callFetch, asyncCall } from "../utils/fetch";

/**
 * Asynchronous function that gets total Pokemon count from (Bastion) Pokédex API
 * @returns {number} Total count of Pokemon in the API
 */
async function getTotalPokemonCountFromBastion() {
  const url = "https://pokeapi.bastionbot.org/v1/pokemon/counts";
  return await callFetch(url)["total"];
}
