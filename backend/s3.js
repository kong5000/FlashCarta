var AWS = require('aws-sdk');
const fs = require('fs');

AWS.config.loadFromPath('./config.json');

AWS.config.update({ region: 'us-west-1' });
const BUCKET_NAME = "flashcard-audio"
const EXPIRATION_TIME = 600 //10 minutes
const Bottleneck = require('bottleneck')
const limiter = new Bottleneck({
  maxConcurrent: 1,
  minTime: 333
});
// Create S3 service object
s3 = new AWS.S3({ apiVersion: '2006-03-01' });

function getSignedAudioUrl(key) {
  let params = { Bucket: BUCKET_NAME, Key: key, Expires: EXPIRATION_TIME };
  let url = s3.getSignedUrl('getObject', params);
  return url
}

async function uploadToAudioBucket(BUCKET_NAME, filename, fileContent) {
  try {
    const params = {
      Bucket: BUCKET_NAME,
      Key: filename,
      Body: fileContent
    }
    const stored = await s3.upload(params).promise()
    console.log(stored);
  } catch (err) {
    console.log(err)
  }
}

let uploadAudioFolderToBucket = async (filename) => {
  const fileContent = fs.readFileSync(`./audio/${filename}`)
  await uploadToAudioBucket(
    process.env.PORTUGUESE_BUCKET_NAME,
    filename,
    fileContent
  )

  fs.unlink(`./audio/${filename}`, function(err) {
    if(err && err.code == 'ENOENT') {
        // file doens't exist
        console.info("File not found, nothing to delete");
    } else if (err) {
        console.error(err);
    } else {
        console.info(`removed`);
    }
});
  //delete audio folder
}


module.exports = {
  uploadToAudioBucket,
  getSignedAudioUrl,
  uploadAudioFolderToBucket
}

