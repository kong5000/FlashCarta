//script to read csv file of portuguese words and convert them to speech
const { pollyTextToSpeech } = require('../polly')
const fs = require('fs');
const path = require('path');
const csv = require('fast-csv');

let wordlist = []
fs.createReadStream(path.resolve('Portuguese Frequency Dictionary.csv'))
    .pipe(csv.parse({ headers: true }))
    .on('error', error => console.error(error))
    .on('data', row => {
        wordlist.push(row)
    })
    .on('end', rowCount => {
        for (let i = 0; i < 10; i++) {
            let foreignWord = wordlist[i].Portuguese
            pollyTextToSpeech(foreignWord, foreignWord, "Camila", "neural")
        }
    });

