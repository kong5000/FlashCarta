//A script to upload all mp3s to the s3 bucket
const testFolder = './audio';
const fs = require('fs');
require('dotenv').config()
const { uploadToAudioBucket } = require('../s3')

const Bottleneck = require('bottleneck')
const limiter = new Bottleneck({
  maxConcurrent: 1,
  minTime: 333
});


let uploadAudioFolderToBucket = async () => {
  fs.readdir(testFolder, (err, files) => {
    files.forEach(file => {
      const filename = file
      const fileContent = fs.readFileSync(`./audio/${filename}`)
      limiter.schedule(() => uploadToAudioBucket(
        process.env.PORTUGUESE_BUCKET_NAME,
        filename,
        fileContent
      ))
    });
  });
}

uploadAudioFolderToBucket()