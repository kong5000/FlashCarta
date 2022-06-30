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
    comprehensionScaling: {type: Number, default: 1},
    rankingScaling: {type: Number, default: 1},
    subscription: String,
    cardsPerSession: {type: Number, default: 15}
})

const cardSchema = new mongoose.Schema({
    lastSeen: Date,
    user: { type: String, required: true },
    priority: { type: Number, required: true },
    ignored: { type: Boolean, default: false },
    language: String,
    ranking: Number, //the most common word of a language would have ranking 1
    word: { type: String, required: true }, //word in foreign language
    definition: { type: String, required: true }, //definition in english
    type: String, //adjective, verb etc...
    creator: String, //Either a user ID for user made definitions or null for default definitions,
    category: String  //Parts of the body, actions, animals etc... //null for default cards
})

cardSchema.index({ user: 1, priority: 1, word: 1 })
const cardModel = mongoose.model('Card', cardSchema)

const cardGroud = new mongoose.Schema({
    name: {type: String, required: true},
    wordList: {type: Array, required: true}
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

const updateCardRating = async (user, comprehension) => {
    const newRating = comprehension * user.comprehensionScaling
    await cardModel.updateOne({ _id: existingCard._id }, { ranking: newRanking })
    console.log("card updated")
}

const initializePriority = (card, user) => {
    return card.ranking * user.rankingScaling
}

const generateDeck = async (deckRequest) => {
    const { userId, language, start, end } = deckRequest
    const definitions = await getDefinitions(language, start, end)
    let cards = []
    // let user = getUser(userId)
    definitions.forEach(def => {
        const newCard = {
            lastSeen: Date.now(),
            user: userId,
            priority: initializePriority(card, user),
            definition: def.definition,
            word: def.word,
            ranking: def.ranking,
            language: def.language,
            type: def.type,
            creator: def.creator
        }
        cards.push(newCard)
    })

    cardModel.insertMany(cards, (err, docs) => {
        console.log("Success!")
    })
}

// generateDeck({ userId: "test", language:"pt", start:0, end:5 })

module.exports = {
    insertDefinitions,
    getDefinitions,
    updateCardRating
}