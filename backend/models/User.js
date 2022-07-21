const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    _id: String, //same as firebase uuid
    languages: { type: Array, default: ['pt'] },
    comprehensionScaling: { type: Number, default: 1 },
    rankingScaling: { type: Number, default: 1 },
    subscription: { type: String, default: null },
    cardsPerSession: { type: Number, default: 5 },
    customCards: { type: Number, default: 10 },
    email: String
})
module.exports = mongoose.model('User', userSchema)