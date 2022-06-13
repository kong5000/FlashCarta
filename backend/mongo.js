const mongoose = require('mongoose')
require('dotenv').config()
mongoose.connect(process.env.MONGO_CONNECTION)

const definitionSchema = new mongoose.Schema({
    language: String,
    ranking: Number, //the most common word of a language would have ranking 1
    word: { type : String, required : true }, //word in foreign language
    definition: { type : String, required : true }, //definition in english
    type: String, //adjective, verb etc...
    creator: String //Either a user ID for user made definitions or null for default definitions
})

//Enforce 1 definition for each word in each language
definitionSchema.index({ "language": 1, "word": 1, "ranking": 1}, { "unique": true });

const userSchema = new mongoose.Schema({
    id: String, //same as firebase uuid
    languages: Array, //{language: Portuguese, score: 1000}
    settings: Object,
})
const cardSchema = new mongoose.Schema({
    lastSeen: Date,
    definition: { type: mongoose.Schema.Types.ObjectId, ref: 'Definition' },
    difficultyHistory: Array, //Last 5
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}) 
/**@todo index on user ID */

//Record statitistics after every session. Record user score for the day across all exercises completed.
const dailyRecordSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    date: Date,
    language: String,
    score: Number
})

const insertDefinitions = async (definitions) => {
    if(!Array.isArray(definitions)){}

    let models = definitions.map(def => {  
        const {language, ranking, word, definition, type, creator} = def
        const definitionModel = mongoose.model('Definition', definitionSchema)

        return newDefinition = new definitionModel({
            language,
            ranking,
            word,
            definition,
            type,
            creator
        })
    })
    try{
        await Promise.all(models.map(model => model.save()))
        console.log("All definitions saved in db")
    }catch(err){
        console.log(err)
    }

}

module.exports = {
    insertDefinitions
}

 