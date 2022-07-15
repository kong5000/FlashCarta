const AWS = require('aws-sdk');
const fs = require('fs');
AWS.config.loadFromPath('./config.json');
// Create an Polly client
const Polly = new AWS.Polly({
    signatureVersion: 'v4',
    region: 'us-east-1'
});


function pollyTextToSpeech(text, outputFileName, voiceId, engine) {
    //Additional param attributes https://docs.aws.amazon.com/polly/latest/dg/API_SynthesizeSpeech.html
    let params = {
        'Engine': engine,
        'Text': text,
        'OutputFormat': 'mp3',
        'VoiceId': voiceId,
    };

    Polly.synthesizeSpeech(params, (err, data) => {
        if (err) {
            console.log(err.code)
        } else if (data) {
            if (data.AudioStream instanceof Buffer) {
                //write Audio stream to file relative to this program
                fs.writeFile(`./audio/${outputFileName}.mp3`, data.AudioStream, function (err) {
                    if (err) {
                        return console.log(err)
                    }
                    console.log("The file was saved!")
                });
            }
        }
    });
}

function textToSpeech(text, outputFileName, folder, voiceId) {
    //Additional param attributes https://docs.aws.amazon.com/polly/latest/dg/API_SynthesizeSpeech.html
    let params = {
        'Engine': 'neural',
        'Text': text,
        'OutputFormat': 'mp3',
        'VoiceId': voiceId,
    };

    return new Promise(function(resolve, reject) {
        Polly.synthesizeSpeech(params, (err, data) => {
            if (err) {
                console.log(err.code)
                reject(err.code)
            } else if (data) {
                if (data.AudioStream instanceof Buffer) {
                    //write Audio stream to file relative to this program
                    fs.writeFile(`./${folder}/${outputFileName}.mp3`, data.AudioStream, function (err) {
                        if (err) {
                            return console.log(err)
                        }
                        console.log("The file was saved!")
                        resolve()
                    });
                }
            }
        });
    });


}
module.exports = {
    pollyTextToSpeech,
    textToSpeech
}