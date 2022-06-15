const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const auth = require('./auth')
const { getDefinitions } = require('./mongo')
const app = express()
const NodeCache = require( "node-cache" );
const cache = new NodeCache();

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
    const deck = await getDefinitions(language, start, end)
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
    let deck = cache.get( `${language + set}` );
    if ( deck == undefined ){
      console.log("Set not cached, retrieving from database")
      deck = await getDefinitions(language, start, end)
    }else{
      console.log(`Successfully retrieved ${language} set ${set} from cache`)
    }
    return res.status(200).send(deck)
  } catch (err) {
    console.log(err)
    return res.status(400).send("Could not retrieve deck definitions")
  }
})

app.delete('/delete-card', (req, res) => {

})

app.delete('/flush-cache', (req, res) => {
  /**@todo endpoint to flush cache without restarting the server, admin access only */
  // When word definitions are updated, need to flush cache
  // cache.flushAll()
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})