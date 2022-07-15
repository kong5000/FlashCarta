const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const auth = require('./auth')
const { insertNewCard, getUserStatistics, getDeckByCategory, generateDeck, updateCardPriority, getDeckByRanking } = require('./mongo')
const { textToSpeech } = require('./polly')

const app = express()
const TEST_USER = 'JCw61e6wnjgrjE7CetVKxHKVteq2'

app.use(cors())
app.use(bodyParser.json())
// app.use(auth.isAuthorized) 
const SET_SIZE = 15
const port = 5001

app.post('/login', (req, res) => {
  //Return Settings, Stats, and Card Stack
  res.send('Hello World!')
})

app.post('/signup', (req, res) => {
  //For now initialize to Portuguese beginning settings
  //Create User doc (statistics, settings, progress)
})

app.post('/add-custom-card', auth.isAuthorized, async (req, res) => {
  const { language, word, definition } = req.body
  const user = res.locals.user
  try {
    const newCard = await insertNewCard(user.uid, 'pt', word, definition)

    await textToSpeech(word, word, './audio', "Camila")
    return res.status(200).send('Successfully inserted card')
  } catch (err) {
    console.log(err)
    return res.status(400).send('Error inserting card')
  }
})

app.get('/get-deck/:language/:userId', auth.isAuthorized, async (req, res) => {
  const { language, userId } = req.params
  const user = res.locals.user

  //Get 15 of the lowest rank cards from userId
})

app.get('/get-deck-ranking/:language/:start/:end/:size', auth.isAuthorized, async (req, res) => {
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
})

app.get('/get-deck-category/:language/:category/:size', auth.isAuthorized, async (req, res) => {
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
})

app.get('/get-statistics', auth.isAuthorized, async (req, res) => {
  const user = res.locals.user
  try {
    const stats = await getUserStatistics(user.uid)
    return res.status(200).send(stats)
  } catch (err) {
    console.log(err)
    return res.status(400).send('Could not retrieve user statistics')
  }
})

app.post(`/rate-card`, auth.isAuthorized, async (req, res) => {
  try {
    const { card, rating } = req.body
    const updatedCard = await updateCardPriority(card, rating)
    return res.status(200).send(updatedCard)
  } catch (err) {
    console.log(err)
    return res.status(400).send('Error updating card rating')
  }
})


app.delete('/delete-card', (req, res) => {

})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
