require('dotenv').config();

const mongoose = require('mongoose')
mongoose.connect(process.env.MONGO_CONNECTION)

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const stripeRouter = require('./routes/stripe')
const userRouter = require('./routes/user')
const cardRouter = require('./routes/card')

const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(userRouter)
app.use(cardRouter)
app.use(stripeRouter)

app.get('/', async (req, res) => {
  console.log("Test")
  return res.status(200).send('Hello World')
})

const PORT = process.env.PORT || 5001
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})
