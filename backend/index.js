const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const auth = require('./auth')
const { getUserStatistics, getDeckByCategory, generateDeck, updateCardPriority, getDeckByRanking } = require('./mongo')
const app = express()
const { getSignedAudioUrl } = require('./s3')
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

app.post('/add-custom-card', auth.isAuthorized, (req, res) => {
  //Create new definition object upload to mongo
  //Attach new definition id to card object and upload card to mongo
  console.log(res.locals.user)
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
    deck.sort((a, b) => {
      if (a.ranking < b.ranking) return -1
      if (a.ranking > b.ranking) return 1
      return 0
    })
  }
  deck = deck.slice(0, size)
  for (let i = 0; i < deck.length; i++) {
    deck[i].audio = getSignedAudioUrl(`${deck[i].word}.mp3`)
  }
  return res.status(200).send(deck)
})

app.get('/get-deck-category/:language/:category/:size', auth.isAuthorized, async (req, res) => {
  const { language, category, size } = req.params
  const user = res.locals.user

  //Simulate delay, just to test front end loading screens
  const now = new Date().valueOf()
  const waitTime = Math.max(0, -(new Date().valueOf() - now) + 1000)
  await new Promise(resolve => setTimeout(resolve, waitTime))


  let deck = await getDeckByCategory(user.uid, language, category, size)
  if (deck.length === 0) {
    console.log("generating deck")
    const deckRequest = { userId: user.uid, language, category }
    await generateDeck(deckRequest)
    deck = await getDeckByCategory(user.uid, language, category, size)

    deck.sort((a, b) => {
      if (a.ranking < b.ranking) return -1
      if (a.ranking > b.ranking) return 1
      return 0
    })
    deck = deck.slice(0, size)
  }

  for (let i = 0; i < deck.length; i++) {
    deck[i].audio = getSignedAudioUrl(`${deck[i].word}.mp3`)
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
