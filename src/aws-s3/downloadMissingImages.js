const fs = require('fs');
const request = require('request');
const path = require('path');

// Downloads from `uri` into `filename` destination using `request` and `fs`
function download(uri, filename, callback) {
  request.head(uri, function(err, res, body) {
    request(uri).pipe(fs.createWriteStream(filename).on('close', callback));
  });
}

// Bulk download based on the `missingImages` array of objects
function downloadImages(missingImages, destination) {
  for (let { number, img } of missingImages) {
    // Name/location of image
    const output = `${destination}/${number}.png`;

    download(img, output, () =>
      console.log('Successfully downloaded', `${number}.png`)
    );
  }
}

// Destination folder to store downloaded images
const destination = path.join(__dirname, './images-missing');

// Missing images that were not downloaded from original script
// in downloadImages.js
const missingImages = [
  {
    number: 412,
    img: 'https://pokeres.bastionbot.org/images/pokemon/412-plant-cloak.png'
  },
  {
    number: 413,
    img: 'https://pokeres.bastionbot.org/images/pokemon/413-plant-cloak.png'
  },
  {
    number: 421,
    img: 'https://pokeres.bastionbot.org/images/pokemon/421-sunshine.png'
  },
  {
    number: 487,
    img: 'https://pokeres.bastionbot.org/images/pokemon/487-altered.png'
  },
  {
    number: 492,
    img: 'https://pokeres.bastionbot.org/images/pokemon/492-land.png'
  },
  {
    number: 585,
    img: 'https://pokeres.bastionbot.org/images/pokemon/585-summer.png'
  },
  {
    number: 586,
    img: 'https://pokeres.bastionbot.org/images/pokemon/586-spring.png'
  },
  {
    number: 641,
    img: 'https://pokeres.bastionbot.org/images/pokemon/641-incarnate.png'
  },
  {
    number: 642,
    img: 'https://pokeres.bastionbot.org/images/pokemon/642-incarnate.png'
  },
  {
    number: 647,
    img: 'https://pokeres.bastionbot.org/images/pokemon/647-resolute.png'
  },
  {
    number: 648,
    img: 'https://pokeres.bastionbot.org/images/pokemon/648-pirouette.png'
  },
  {
    number: 718,
    img: 'https://pokeres.bastionbot.org/images/pokemon/718-complete.png'
  },
  {
    number: 720,
    img: 'https://pokeres.bastionbot.org/images/pokemon/720-confined.png'
  },
  {
    number: 741,
    img: 'https://pokeres.bastionbot.org/images/pokemon/741-baile.png'
  },
  {
    number: 745,
    img: 'https://pokeres.bastionbot.org/images/pokemon/745-dusk.png'
  },
  {
    number: 746,
    img: 'https://pokeres.bastionbot.org/images/pokemon/746-solo.png'
  },
  {
    number: 774,
    img: 'https://pokeres.bastionbot.org/images/pokemon/774-meteor.png'
  },
  {
    number: 778,
    img: 'https://pokeres.bastionbot.org/images/pokemon/778-busted.png'
  }
];

// Call function
downloadImages(missingImages, destination);
