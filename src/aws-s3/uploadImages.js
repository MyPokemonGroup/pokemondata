const AWS = require('aws-sdk');
const fs = require('fs');
const path = require('path');

// Instantiate new AWS s3 object
const s3 = new AWS.S3();

// Upload single image
function uploadImage(
  number,
  sourceDirectory,
  missingImages,
  skipMissing = true
) {
  // Check if passed in `number` is part of the `missing` list
  if (!skipMissing && missingImages.includes(number)) return;

  // Define AWS params
  const uploadParams = {
    Bucket: 'pokemon-images',
    Key: '',
    Body: '',
    ACL: 'public-read',
    ContentType: 'image/png'
  };

  // Find file to upload
  const filePath = `${sourceDirectory}/${number}.png`;
  // Create stream
  const fileStream = fs.createReadStream(filePath);

  // Handle error
  fileStream.on('error', function(err) {
    console.log('File error', err);
  });

  // Define contents of upload file
  uploadParams.Body = fileStream;
  // Define destination and name of upload
  uploadParams.Key = `images/${path.basename(filePath)}`;

  // Call s3 API's upload() method
  s3.upload(uploadParams, function(err, data) {
    if (err) {
      console.log('Error', err);
    }
    if (data) {
      console.log('Upload Success', data.Location);
    }
  });
}

// Bulk upload multiple images from `start` to `end`
function uploadImages(start = 1, end = 100, sourceDirectory, missingImages) {
  const timeInterval = 100; // milliseconds

  for (let number = start; number <= end; number++) {
    setTimeout(
      uploadImage,
      timeInterval,
      number,
      sourceDirectory,
      missingImages,
      false
    );
  }
}

// Upload missing images from `missingImages` array
function uploadMissingImages(missingImages, sourceMissing) {
  const timeInterval = 100; // milliseconds

  for (let number of missing) {
    setTimeout(uploadImage, timeInterval, number, sourceMissing, missingImages);
  }
}

// Source of original images
const sourceDirectory = path.join(__dirname, './images');
// Source of missing images
const sourceMissing = path.join(__dirname, './missing');
// List of missing images
const missingImages = [
  412,
  413,
  421,
  487,
  492,
  585,
  586,
  641,
  642,
  647,
  648,
  718,
  720,
  741,
  745,
  746,
  774,
  778
];

// Call upload on original images
uploadImages(1, 807, sourceDirectory, missingImages);

// Call upload on missing images
uploadMissingImages(sourceMissing, missingImages);
