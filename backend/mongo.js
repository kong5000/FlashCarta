const mongoose = require('mongoose')
require('dotenv').config()
mongoose.connect(process.env.MONGO_CONNECTION)
var fs = require('fs');


const definitionSchema = new mongoose.Schema({
    language: { type: String, required: true },
    ranking: { type: Number, required: true }, //the most common word of a language would have ranking 1
    word: { type: String, required: true }, //word in foreign language
    definition: { type: String, required: true }, //definition in english
    type: String, //adjective, verb etc...
    creator: String, //Either a user ID for user made definitions or null for default definitions
    category: String  //Parts of the body, actions, animals etc... //null for default cards
})
const definitionModel = mongoose.model('Definition', definitionSchema)

//Enforce 1 definition for each word in each language
definitionSchema.index({ "language": 1, "word": 1, "ranking": 1 }, { "unique": true });

const userSchema = new mongoose.Schema({
    _id: String, //same as firebase uuid
    languages: Array,
    comprehensionScaling: { type: Number, default: 1 },
    rankingScaling: { type: Number, default: 1 },
    subscription: String,
    cardsPerSession: { type: Number, default: 15 }
})
const userModel = mongoose.model('User', userSchema)

const cardSchema = new mongoose.Schema({
    lastSeen: Date,
    user: { type: String, required: true },
    priority: { type: Number, default: 1 },
    ignored: { type: Boolean, default: false },
    language: String,
    ranking: Number, //the most common word of a language would have ranking 1
    word: { type: String, required: true }, //word in foreign language
    definition: { type: String, required: true }, //definition in english
    type: String, //adjective, verb etc...
    creator: String, //Either a user ID for user made definitions or null for default definitions,
    category: String  //Parts of the body, actions, animals etc... //null for default cards
})

cardSchema.index({ user: 1, priority: 1, word: 1 }, { unique: true })
const cardModel = mongoose.model('Card', cardSchema)

const getDefinitionsByRanking = async (language, startRank, endRank) => {
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
const getDefinitionsByCategory = async (language, category) => {
    const definitions = await definitionModel.find(
        { language, category }
    )
    return definitions
}
const insertDefinitions = async (definitions) => {
    if (!Array.isArray(definitions)) { }

    let models = definitions.map(def => {
        const { language, ranking, word, definition, type, creator, category } = def

        return newDefinition = new definitionModel({
            language,
            ranking,
            word,
            definition,
            type,
            creator,
            category
        })
    })
    try {
        await Promise.all(models.map(model => model.save()))
        console.log("All definitions saved in db")
    } catch (err) {
        console.log(err)
    }
}
const MAX_PRIORITY = 5 //move to constants files
const updateCardPriority = async (card, rating) => {
    let newPriority = card.priority + parseInt(rating)
    console.log(rating)
    console.log(newPriority)
    if (newPriority < 0) {
        newPriority = 0
    } else if (newPriority > MAX_PRIORITY) {
        newPriority = MAX_PRIORITY
    }

    const updatedCard = await cardModel.updateOne({ _id: card._id }, { priority: newPriority, lastSeen: Date.now() })
    console.log("card updated")
    return updatedCard
}

const getNumberOfMasteredCards = async (user, language) => {
    const cards = await cardModel.count(
        {
            language,
            user: user.id,
            priority: {
                $gte: MAX_PRIORITY - 1
            }
        }
    )
}

const initializePriority = (card, user) => {
    //Return 0 for now, maybe use user settings to set priority of card.
    return 0
}

const generateDeck = async (deckRequest) => {
    const { userId, language, start, end, category } = deckRequest
    let definitions = null
    if (category) {
        definitions = await getDefinitionsByCategory(language, category)
    } else {
        definitions = await getDefinitionsByRanking(language, start, end)
    }
    let cards = []
    // let user = getUser(userId)
    let user = {
        rankingScaling: 1
    }
    definitions.forEach(def => {
        const newCard = {
            lastSeen: Date.now(),
            user: userId,
            // priority: initializePriority(def, user), //priority defaults to 1
            definition: def.definition,
            word: def.word,
            ranking: def.ranking,
            language: def.language,
            type: def.type,
            creator: def.creator,
            category
        }
        cards.push(newCard)
    })
    let promise = new Promise((resolve, reject) => {
        let newDeck = cardModel.insertMany(cards, (err, docs) => {
            if (!err) {
                resolve(docs)
            }
            reject(err)
        })
    })
    result = await promise
    return result
}

const getDeckByCategory = async (userId, language, category, size) => {
    console.log(`SIZE ${size}`)
    const cards = await cardModel.find(
        { language, category, user: userId }
    ).sort({ priority: 1, ranking: 1 }).limit(size)
    console.log("GOT CARDS")

    return cards
}
// generateDeck({ userId: "a", language:"pt", start:0, end:5, category: "clothing" })
const createNewUserInfo = async (userId) => {
    const newUserInfo = new userModel({
        _id: userId,
        languages: ['pt'],
    })
    let newUserDoc = await newUserInfo.save()
    return newUserDoc
}

const getUserStatistics = async (userId) => {
    const cards = await cardModel.find(
        { user: userId }
    )
    const categories = ['clothing', 'animals', 'body', 'transport', 'food']
    const categoryStats = {}
    categories.forEach(category => {
        let singleCategoryDeck = cards.filter(card => card.category === category)
        let cardsMasteredInCategory = singleCategoryDeck.filter(card => card.priority === MAX_PRIORITY)
        categoryStats[category] = {}
        categoryStats[category]['totalSize'] = singleCategoryDeck.length
        categoryStats[category]['totalMastered'] = cardsMasteredInCategory.length
    })
    console.log(categoryStats)
    
}
getUserStatistics('JCw61e6wnjgrjE7CetVKxHKVteq2')

module.exports = {
    insertDefinitions,
    getDefinitionsByRanking,
    getDefinitionsByCategory,
    getDeckByCategory,
    generateDeck,
    createNewUserInfo,
    getUserStatistics,
    updateCardPriority
}