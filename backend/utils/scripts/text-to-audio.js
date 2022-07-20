//script to read csv file of portuguese words and convert them to speech
const { pollyTextToSpeech } = require('../polly')
const fs = require('fs');
const path = require('path');
const csv = require('fast-csv');
const Bottleneck = require('bottleneck')

const limiter = new Bottleneck({
    maxConcurrent: 1,
    minTime: 200
  });
  
let wordlist = []
fs.createReadStream(path.resolve('./definitions/animals.csv'))
    .pipe(csv.parse({ headers: true }))
    .on('error', error => console.error(error))
    .on('data', row => {
        wordlist.push(row)
    })
    .on('end', rowCount => {
        wordlist.forEach(definition => {
            let foreignWord = definition.word
            limiter.schedule(() =>{
                pollyTextToSpeech(foreignWord, foreignWord, "Camila", "neural")
            })
        })

    });

