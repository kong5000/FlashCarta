const mongoose = require('mongoose')
require('dotenv').config()
mongoose.connect(process.env.MONGO_CONNECTION)

const definitionSchema = new mongoose.Schema({
    language: String,
    ranking: Number, //the most common word of a language would have ranking 1
    word: { type: String, required: true }, //word in foreign language
    definition: { type: String, required: true }, //definition in english
    type: String, //adjective, verb etc...
    creator: String //Either a user ID for user made definitions or null for default definitions
})
const definitionModel = mongoose.model('Definition', definitionSchema)


//Enforce 1 definition for each word in each language
definitionSchema.index({ "language": 1, "word": 1, "ranking": 1 }, { "unique": true });

const userSchema = new mongoose.Schema({
    id: String, //same as firebase uuid
    languages: Array, //{language: Portuguese, score: 1000}
    settings: Object,
})
const cardSchema = new mongoose.Schema({
    lastSeen: Date,
    definition: { type: mongoose.Schema.Types.ObjectId, ref: 'Definition', required: true },
    difficultyHistory: { type: Array, default: [null, null, null, null] },
    user: { type: String, required: true }
})
const cardModel = mongoose.model('Card', cardSchema)

/**@todo index on user ID */

//Record statitistics after every session. Record user score for the day across all exercises completed.
const dailyRecordSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    date: Date,
    language: String,
    score: Number
})

const getDefinitions = async (language, startRank, endRank) => {
    const definitions = await definitionModel.find(
        {
            language,
            ranking: {
                $lte: endRank,
                $gte: startRank
            }
        }
    )
    return definitions
}

const insertDefinitions = async (definitions) => {
    if (!Array.isArray(definitions)) { }

    let models = definitions.map(def => {
        const { language, ranking, word, definition, type, creator } = def

        return newDefinition = new definitionModel({
            language,
            ranking,
            word,
            definition,
            type,
            creator
        })
    })
    try {
        await Promise.all(models.map(model => model.save()))
        console.log("All definitions saved in db")
    } catch (err) {
        console.log(err)
    }
}

const upsertCard = async (userId, card) => {
    //Check if exists
    // Get previous array
    // [1, 2, 3, 4, 5]
    // difficultyHistory.pop()
    // difficultyHistory.push(newRating)
    // update lastScene
    //Create new card
    const existingCard = await cardModel.findOne({user: userId, definition: card._id})
    console.log(existingCard)
    if(existingCard){
        const difficultyHistory = existingCard.difficultyHistory
        difficultyHistory.pop()
        difficultyHistory.unshift(card.rating)
        await cardModel.updateOne({_id :existingCard._id}, {difficultyHistory})
        console.log("card updated")
        return
    }
    const newCard = new cardModel({
        lastSeen: Date.now(),
        definition: card._id,
        user: userId
    })
    await newCard.save()

}

module.exports = {
    insertDefinitions,
    getDefinitions,
    upsertCard
}

