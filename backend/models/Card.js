const mongoose = require('mongoose')

const cardSchema = new mongoose.Schema({
    lastSeen: Date,
    user: { type: String, required: true },
    priority: { type: Number, default: 0 },
    ignored: { type: Boolean, default: false },
    language: String,
    ranking: Number, //the most common word of a language would have ranking 1
    word: { type: String, required: true }, //word in foreign language
    definition: { type: String, required: true }, //definition in english
    type: String, //adjective, verb etc...
    creator: String, //Either a user ID for user made definitions or null for default definitions,
    category: String  //Parts of the body, actions, animals etc... //null for default cards
})
cardSchema.index({ user: 1, priority: 1, word: 1 }, { unique: true })

module.exports = mongoose.model('Card', cardSchema)

