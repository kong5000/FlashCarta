require('dotenv').config();
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const auth = require('./auth')
const { updateUserSettings, getUser, createUser, insertNewCard, getUserStatistics, getDeckByCategory, generateDeck, updateCardPriority, getDeckByRanking } = require('./mongo')
const { textToSpeech } = require('./polly')
const { uploadAudioFolderToBucket } = require('./s3')
const stripe = require('stripe')(process.env.STRIPE_KEY);
const app = express()

app.use(cors())
app.use(bodyParser.json())
// app.use(auth.isAuthorized) 

app.post('/stripe', async (req, res) => {
  // const customer = await stripe.customers.retrieve(
  //   'cus_LxyROGlhG4S005'
  // );
  // const uid = customer.metadata.firebaseUID
})

app.get('/checkout', auth.isAuthorized, async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    success_url: 'http://localhost:3000/dashboard',
    cancel_url: 'http://localhost:3000/dashboard',
    line_items: [
      { price: 'price_1LMMYOHLjVvtqNCUQ4ItfAjS', quantity: 1 }
    ],
    mode: 'subscription',
    discounts: [{
      coupon: 'Id4ga1cR',
    }],
  })
  console.log(session)
  return res.status(200).send(session)
})

app.get('/user-data', auth.isAuthorized, async (req, res) => {
  //Return Settings, Stats, and Card Stack
  const user = res.locals.user
  try{
    let userInfo = await getUser(user.uid)
    if (!userInfo.length) {
      await createUser(user.uid)
      userInfo = await getUser(user.uid)
    }
    console.log("USER INFO HERE")
    console.log(userInfo)
    res.status(200).send(userInfo[0])
  }catch(err){
    console.log(err)
    return res.status(400).send(err)
  }
})

app.post('/add-custom-card', auth.isAuthorized, async (req, res) => {
  const { language, word, definition } = req.body
  const user = res.locals.user
  try {
    const newCard = await insertNewCard(user.uid, 'pt', word, definition)

    await textToSpeech(word, word, './audio', "Camila")
    await uploadAudioFolderToBucket(`${word}.mp3`)
    console.log("FINISHED")
    return res.status(200).send('Successfully inserted card')
  } catch (err) {
    console.log(err)
    return res.status(400).send('Error inserting card')
  }
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

app.post(`/update-settings`, auth.isAuthorized, async (req, res) => {
  const user = res.locals.user
  const settings = req.body
  try{
    await updateUserSettings(user.uid, settings)
    return res.status(200).send()
  }catch(err){
    console.log(err)
    return res.status(400).send('Could not update user settings')
  }
})

app.get('/', async(req,res) => {
  console.log("Test")
  return res.status(200).send('Hello World')
})

const PORT = process.env.PORT || 5001

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})
