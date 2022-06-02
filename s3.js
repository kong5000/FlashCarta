var AWS = require('aws-sdk');
AWS.config.loadFromPath('./config.json');

AWS.config.update({region: 'us-west-1'});
const BUCKET_NAME = "flashcard-audio"
const EXPIRATION_TIME = 600 //10 minutes

// Create S3 service object
s3 = new AWS.S3({apiVersion: '2006-03-01'});

function getSignedAudioUrl(key){
    let params = {Bucket: BUCKET_NAME, Key: key, Expires: EXPIRATION_TIME};
    let url = s3.getSignedUrl('getObject', params);
    console.log('The URL is', url);
}

getSignedAudioUrl('test-audio.mp3')

