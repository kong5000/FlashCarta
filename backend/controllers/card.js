const cardModel = require('../models/Card')
const { getSignedAudioUrl } = require('../services/s3');
const { getDefinitionsByCategory, getDefinitionsByRanking } = require('./definition')

const getDeckByCategory = async (userId, language, category, size) => {
    let deck = await cardModel.find(
        { language, category, user: userId }
    ).sort({ priority: 1, ranking: 1 }).limit(size).lean()
    deck = formatDeck(deck, size)

    return deck
}

const getDeckByRanking = async (user, language, startRank, endRank, size) => {
    let deck = await cardModel.find(
        {
            user,
            language,
            ranking: {
                $lte: endRank,
                $gte: startRank
            }
        }
    ).sort({ priority: 1, ranking: 1 }).limit(size ? size : 10).lean()
    //Need to findout why size is sometimes not set, in the meantime added ternary operator
    deck = formatDeck(deck, size ? size : 10)
    return deck
}

const formatDeck = (deck, size) => {
    deck.sort((a, b) => {
        if (a.ranking < b.ranking) return -1
        if (a.ranking > b.ranking) return 1
        return 0
    })
    deck = deck.slice(0, size)
    for (let i = 0; i < deck.length; i++) {
        deck[i].audio = getSignedAudioUrl(`${deck[i].word}.mp3`)
    }
    return deck
}
// generateDeck({ userId: "a", language:"pt", start:0, end:5, category: "clothing" })

const insertNewCard = async (uid, language, word, definition) => {
    const newCard = new cardModel({
        lastSeen: Date.now(),
        user: uid,
        definition,
        word: word,
        ranking: null,
        language: 'pt',
        type: null,
        creator: uid,
        category: 'custom'
    })
    await newCard.save()
    return newCard
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

    definitions.forEach(def => {
        const newCard = {
            lastSeen: Date.now(),
            user: userId,
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

const getAllUserCards = async (userId) => {
    const cards = await cardModel.find(
        { user: userId }
    )
    return cards
}
module.exports = {
    getAllUserCards,
    getDeckByCategory,
    generateDeck,
    updateCardPriority,
    getDeckByRanking,
    insertNewCard
}