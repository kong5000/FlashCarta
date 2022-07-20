const mongoose = require('mongoose')

const definitionSchema = new mongoose.Schema({
    language: { type: String, required: true },
    ranking: { type: Number, required: true }, //the most common word of a language would have ranking 1
    word: { type: String, required: true }, //word in foreign language
    definition: { type: String, required: true }, //definition in english
    type: String, //adjective, verb etc...
    creator: String, //Either a user ID for user made definitions or null for default definitions
    category: String  //Parts of the body, actions, animals etc... //null for default cards
})
definitionSchema.index({ "language": 1, "word": 1, "ranking": 1 }, { "unique": true });

module.exports = mongoose.model('Definition', definitionSchema)
