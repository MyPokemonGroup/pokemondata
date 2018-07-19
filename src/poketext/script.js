import pokemonNumberAndNames from "./txtToArray";
import BastionApiData from "./BastionApiData";
/*
Load from textfile, into DB
*/
function loadFromText(pokemonNumberAndNames) {
  for (let { number, name } of pokemonNumberAndNames) {
    let image = `https://pokeres.bastionbot.org/images/pokemon/${number}.png`;
    BastionApiData.sync()
      .then(() => {
        return BastionApiData.create({
          number,
          name,
          image
        });
      })
      .catch(err => {
        console.error("An error occurred:", err);
      });
  }
}

function loadFromTextRange(pokemonNumberAndNames, start, end) {
  const sliced = pokemonNumberAndNames.slice(start, end);
  loadFromText(sliced);
}

// Loop through in increments, load into DB
function loadFromTextIncrements(increment = 100) {
  if (increment < 1) increment = 100;

  for (let i = 0; i < pokemonNumberAndNames.length; i += increment) {
    let start = i;
    let end = start + increment;
    loadFromTextRange(pokemonNumberAndNames, start, end);
  }
}

// Call to load from textfile
loadFromTextIncrements();
