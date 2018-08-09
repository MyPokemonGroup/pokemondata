import BastionApiData from '../bastionapi/BastionApiData';

// Update the "image" an entry in the "images" table based on pokemonNumber
function updateRowImage(pokemonNumber) {
  // Format:
  // https://s3-us-west-1.amazonaws.com/pokemon-images/images/30.png
  const imageUrl = `https://s3-us-west-1.amazonaws.com/pokemon-images/images/${pokemonNumber}.png`;
  const updateValue = { image: imageUrl };
  BastionApiData.update(updateValue, {
    where: { number: pokemonNumber }
  }).then(affectedCount => {
    console.log(`Successfully updated ${affectedCount} row(s)`);
  });
}

// Update all images, up to maxPokemonNumber
function updateImages(start = 1, maxPokemonNumber = 807) {
  for (
    let pokemonNumber = start;
    pokemonNumber <= maxPokemonNumber;
    pokemonNumber++
  ) {
    updateRowImage(pokemonNumber);
  }
}

// Run to update images
updateImages();
