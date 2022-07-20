const userModel = require('../models/User')
const { getAllUserCards } = require('./card')
const getUser = async (userId) => {
    const user = await userModel.find(
        { _id: userId }
    )
    return user
}

const createUser = async (userId) => {
    return new Promise((resolve, reject) => {
        const newUser = new userModel({
            _id: userId,
        })
        newUser.save(function (err, obj) {
            if (err) {
                reject(err)
            }
            else {
                console.log(obj)
                resolve(obj)
            }
        });
    })
}

const getUserStatistics = async (userId) => {
    const cards = await getAllUserCards(userId)

    const categories = ['clothing', 'animals', 'body', 'transport', 'food']
    const categoryStats = {}

    categories.forEach(category => {
        let singleCategoryDeck = cards.filter(card => card.category === category)
        let userStarsInCategory = 0
        singleCategoryDeck.forEach(card => {
            userStarsInCategory += card.priority
        })
        categoryStats[category] = {}
        categoryStats[category]['totalStars'] = singleCategoryDeck.length * 5
        categoryStats[category]['userStars'] = userStarsInCategory
    })
    
    /**@todo lot of repeated code here, need to clean */
    const wordRankingCategoriers = ['50', '100', '150', '200']
    let index = 1
    wordRankingCategoriers.forEach(category => {
        let singleCategoryDeck = cards.filter(card =>
            (card.ranking >= index && card.ranking <= parseInt(category)))
        index += 50
        let userStarsInCategory = 0
        singleCategoryDeck.forEach(card => {
            userStarsInCategory += card.priority
        })
        categoryStats[category] = {}
        categoryStats[category]['totalStars'] = singleCategoryDeck.length * 5
        categoryStats[category]['userStars'] = userStarsInCategory
    })
    return categoryStats
}

const updateUserSettings = async (userId, settings) => {
    const updatedUser = await userModel.updateOne({ _id: userId }, { cardsPerSession: settings.cardsPerSession })
    return updatedUser
}

module.exports = {
    updateUserSettings,
    getUser,
    createUser,
    getUserStatistics
}