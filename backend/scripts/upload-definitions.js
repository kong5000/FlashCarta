//script to read csv file of portuguese words and convert them to speech
const fs = require('fs');
const path = require('path');
const csv = require('fast-csv');
const { insertDefinitions } = require('../mongo')

let wordlist = []
fs.createReadStream(path.resolve('./definitions/Portuguese Frequency Dictionary.csv'))
    .pipe(csv.parse({ headers: true }))
    .on('error', error => console.error(error))
    .on('data', row => {
        wordlist.push(row)
    })
    .on('end', rowCount => {
        // createDefinition("pt", 0, wordlist[0].Portuguese, wordlist[0].English, wordlist[0].Type, null)
        const definitions = wordlist.map(x => ({...x, language: "pt", creator: null}))
        try{
            insertDefinitions(definitions)

        }catch(err){
            console.log(err)
        }
    });

