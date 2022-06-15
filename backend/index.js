const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const auth = require('./auth')
const { getDefinitions } = require('./mongo')
const app = express()
app.use(cors())
app.use(bodyParser.json())
// app.use(auth.isAuthorized) 
const SET_SIZE = 25
const port = 5001

app.post('/login', (req, res) => {
  //Return Settings, Stats, and Card Stack
  res.send('Hello World!')
})

app.post('/signup', (req, res) => {
  //For now initialize to Portuguese beginning settings
  //Create User doc (statistics, settings, progress)
})

app.post('/add-card', auth.isAuthorized, (req, res) => {
  console.log(res.locals.user)
})

app.get('/get-deck/:language/:start/:end', auth.isAuthorized, async (req, res) => {
  const { language, start, end } = req.params
  try {
    console.log(res.locals.user)
    const deck = await getDefinitions(language, start, end)
    console.log(deck)
    return res.status(200).send(deck)
  } catch (err) {
    console.log(err)
    return res.status(400).send("Could not retrieve deck definitions")
  }
})

app.get('/get-deck/:language/:set', auth.isAuthorized, async (req, res) => {
  const { language, set } = req.params
  const start = set * SET_SIZE
  const end = start + SET_SIZE
  try {
    console.log(res.locals.user)
    const deck = await getDefinitions(language, start, end)
    console.log(deck)
    return res.status(200).send(deck)
  } catch (err) {
    console.log(err)
    return res.status(400).send("Could not retrieve deck definitions")
  }
})



app.delete('/delete-card', (req, res) => {

})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})