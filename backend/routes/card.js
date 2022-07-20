const express = require('express');
const auth = require('./auth')
const router = express.Router();
const {
    insertNewCard,
    getDeckByCategory,
    generateDeck,
    updateCardPriority,
    getDeckByRanking
} = require('../controllers/card')
const { textToSpeech } = require('../services/polly')
const { uploadAudioFolderToBucket } = require('../services/s3')

router.post('/add-custom-card', auth.isAuthorized, async (req, res) => {
    const { language, word, definition } = req.body
    const user = res.locals.user
    try {
        await insertNewCard(user.uid, 'pt', word, definition)
        await textToSpeech(word, word, './audio', "Camila")
        await uploadAudioFolderToBucket(`${word}.mp3`)

        return res.status(200).send('Successfully inserted card')
    } catch (err) {
        console.log(err)
        return res.status(400).send('Error inserting card')
    }
})

router.get('/get-deck-ranking/:language/:start/:end/:size', auth.isAuthorized, async (req, res) => {
    try {
        const { language, start, end, size } = req.params
        const user = res.locals.user
        let deck = await getDeckByRanking(user.uid, language, start, end, size)
        if (deck.length === 0) {
            console.log("generating deck")
            const deckRequest = { userId: user.uid, language, start, end }
            await generateDeck(deckRequest)
            deck = await getDeckByRanking(user.uid, language, start, end, size)
        }
        return res.status(200).send(deck)
    } catch (err) {
        console.log(err)
        return res.status(400).send('Error, could not retrieve deck')
    }
})

router.get('/get-deck-category/:language/:category/:size', auth.isAuthorized, async (req, res) => {
    try {
        const { language, category, size } = req.params
        const user = res.locals.user
        let deck = await getDeckByCategory(user.uid, language, category, size)
        if (deck.length === 0) {
            console.log("generating deck")
            const deckRequest = { userId: user.uid, language, category }
            await generateDeck(deckRequest)
            deck = await getDeckByCategory(user.uid, language, category, size)
        }
        return res.status(200).send(deck)
    } catch (err) {
        console.log(err)
        return res.status(400).send('Could not retrieve deck')
    }
})

router.post(`/rate-card`, auth.isAuthorized, async (req, res) => {
    try {
        const { card, rating } = req.body
        const updatedCard = await updateCardPriority(card, rating)
        return res.status(200).send(updatedCard)
    } catch (err) {
        console.log(err)
        return res.status(400).send('Error updating card rating')
    }
})

module.exports = router;

