const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const auth = require('./auth')

const app = express()
app.use(cors())
app.use(bodyParser.json())
// app.use(auth.isAuthorized) 

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

app.get('/get-deck', auth.isAuthorized, (req, res) => {
  console.log(res.locals.user)

})

app.delete('/delete-card', (req, res) => {

})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})