const mongoose = require('mongoose')
require('dotenv').config()

const url = process.env.MONGO_CONNECTION

const definitionSchema = new mongoose.Schema({
    language: String,
    ranking: Number, //the most common word of a language would have ranking 1
    word: String, //word in foreign language
    definition: String, //definition in english
    type: String, //adjective, verb etc...
    owner: String //Either a user ID for user made definitions or null for default definitions
})

const userSchema = new mongoose.Schema({
    id: String, //same as firebase uuid
    languages: Array, //{language: Portuguese, score: 1000}
    settings: Object,
})
const cardSchema = new mongoose.Schema({
    lastSeen: Date,
    definition: { type: mongoose.Schema.Types.ObjectId, ref: 'Definition' },
    difficultyHistory: Array,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
})

//Record statitistics after every session. Record user score for the day across all exercises completed.
const dailyRecordSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    date: Date,
    language: String,
    score: Number
})

const Note = mongoose.model('Note', noteSchema)

mongoose
    .connect(url)
    .then((result) => {
        console.log('connected')

        const note = new Note({
            content: 'AAAA',
            date: new Date(),
            important: true,
        })

        return note.save()
    })
    .then(() => {
        console.log('note saved!')
        return mongoose.connection.close()
    })
    .catch((err) => console.log(err))