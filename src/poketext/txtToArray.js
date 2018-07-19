const path = require("path");
const fs = require("fs");

const aPath = path.join(__dirname, "pokemon.txt");
const lines = fs
  .readFileSync(aPath, "utf-8")
  .split("\n")
  .filter(Boolean);

function returnArrayOfPokemonObjects(lines) {
  return lines.map(line => {
    const [name, number] = line.split(", ");
    return { name, number };
  });
}

const pokemonNumberAndNames = returnArrayOfPokemonObjects(lines);

export default pokemonNumberAndNames;
