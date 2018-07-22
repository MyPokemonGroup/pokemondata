const download = require('image-downloader');
const path = require('path');

// Use `image-downloader` module to download images
function downloadImage(pokemonNumber, destination) {
  const options = {
    url: `https://pokeres.bastionbot.org/images/pokemon/${pokemonNumber}.png`,
    dest: destination
  };

  download
    .image(options)
    .then(({ filename, image }) => {
      console.log('File saved to', filename);
    })
    .catch(err => {
      console.error(err);
    });
}

// Bulk download images
function downloadImages(start = 1, end = 100, destination) {
  const timeInterval = 100; // milliseconds

  for (let number = start; number <= end; number++) {
    setTimeout(downloadImage, timeInterval, number, destination);
  }
}
// Download images to ./images
const destination = path.join(__dirname, './images');

// Call function
downloadImages(1, 807, destination);
