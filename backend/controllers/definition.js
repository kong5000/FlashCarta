const definitionModel = require('../models/Definition')

const getDefinitionsByRanking = async (language, startRank, endRank) => {
    const definitions = await definitionModel.find(
        {
            language,
            ranking: {
                $lte: endRank,
                $gte: startRank
            }
        }
    )
    return definitions
}

const getDefinitionsByCategory = async (language, category) => {
    const definitions = await definitionModel.find(
        { language, category }
    )
    return definitions
}
const insertDefinitions = async (definitions) => {
    if (!Array.isArray(definitions)) { }

    let models = definitions.map(def => {
        const { language, ranking, word, definition, type, creator, category } = def

        return newDefinition = new definitionModel({
            language,
            ranking,
            word,
            definition,
            type,
            creator,
            category
        })
    })
    try {
        await Promise.all(models.map(model => model.save()))
        console.log("All definitions saved in db")
    } catch (err) {
        console.log(err)
    }
}

module.exports = {
    insertDefinitions,
    getDefinitionsByRanking,
    getDefinitionsByCategory,
}