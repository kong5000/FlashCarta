const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const auth = require('./auth')
const { getDefinitions, getDeckByCategory, generateDeck } = require('./mongo')
const app = express()

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
  //Get 15 of the lowest rank cards from userId
})

app.get('/get-deck-category/:language/:category', auth.isAuthorized, async (req, res) => {
  const { language, category } = req.params
  console.log(req.params)
  const user = res.locals.user
  let deck = await getDeckByCategory(user.uid, language, category)
  if (deck.length === 0) {
    console.log("generating deck")
    const deckRequest = { userId: user.uid, language, category }
    deck = await generateDeck(deckRequest)
  }
  console.log("return deck")
  return res.status(200).send(deck)
})

app.delete('/delete-card', (req, res) => {

})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})