const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const auth = require('./auth')
const { getUserStatistics, getDeckByCategory, generateDeck } = require('./mongo')
const app = express()
const TEST_USER = {
  name: 'Keith O',
  picture: 'https://lh3.googleusercontent.com/a/AATXAJytsLjrInpkdDFcQhndxnypKJH8x3sRf72l9Q3p=s96-c',
  iss: 'https://securetoken.google.com/flash-card-app-351417',
  aud: 'flash-card-app-351417',
  auth_time: 1657559685,
  user_id: 'JCw61e6wnjgrjE7CetVKxHKVteq2',
  sub: 'JCw61e6wnjgrjE7CetVKxHKVteq2',
  iat: 1657572426,
  exp: 1657576026,
  email: 'keith.ong5000@gmail.com',
  email_verified: true,
  firebase: {
    identities: { 'google.com': [Array], email: [Array] },
    sign_in_provider: 'google.com'
  },
  uid: 'JCw61e6wnjgrjE7CetVKxHKVteq2'
}

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

app.get('/get-deck-category/:language/:category/:size', auth.isAuthorized, async (req, res) => {
  const { language, category, size } = req.params
  // const user = res.locals.user
  const user = TEST_USER

  let deck = await getDeckByCategory(user.uid, language, category, size)
  if (deck.length === 0) {
    console.log("generating deck")
    const deckRequest = { userId: user.uid, language, category }
    deck = await generateDeck(deckRequest)
  }

  console.log("return deck")
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

app.delete('/delete-card', (req, res) => {

})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})