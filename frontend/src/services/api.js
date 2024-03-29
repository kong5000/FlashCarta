import axios from 'axios';
const BASE_URL = "https://polar-dawn-24721.herokuapp.com"
// const BASE_URL = "http://localhost:5001"

export const getDeck = async (idToken, language, set) => {
    const res = await axios.get(BASE_URL + `/get-deck/${language}/${set}`, { headers: { "Authorization": `Bearer ${idToken}` } });
    return res.data
}

export const getDeckByCategory = async (idToken, language, category) => {
    const res = await axios.get(BASE_URL + `/get-deck-category/${language}/${category}`, { headers: { "Authorization": `Bearer ${idToken}` } });
    return res.data
}

export const getDeckByRanking = async (idToken, language, ranking) => {
    const res = await axios.get(BASE_URL + `/get-deck-ranking/${language}/${ranking - 49}/${ranking}`, { headers: { "Authorization": `Bearer ${idToken}` } });
    return res.data
}

export const updateCardRating = async (idToken, card, rating) => {
    console.log("UPDATING CARD")
    const res = await axios.post(BASE_URL + `/rate-card`, { card, rating }, { headers: { "Authorization": `Bearer ${idToken}` } })
    return res.data
}

export const getUserStats = async (idToken) => {
    const res = await axios.get(BASE_URL + `/get-statistics`, { headers: { "Authorization": `Bearer ${idToken}` } })
    return res.data
}

export const createCustomCard = async (idToken, card) => {
    await axios.post(BASE_URL + "/add-custom-card", card, { headers: { "Authorization": `Bearer ${idToken}` } })
}

export const getUserInfo = async (idToken) => {
    let userInfo = await axios.get(BASE_URL + "/user-data", { headers: { "Authorization": `Bearer ${idToken}` } });
    return userInfo.data
}

export const getCheckoutSession = async (idToken) => {
    let session = await axios.get(BASE_URL + "/checkout", { headers: { "Authorization": `Bearer ${idToken}` } });
    return session.data
}

export const updateSettings = async (idToken, settings) => {
    let updatedSettings = await axios.post(BASE_URL + "/update-settings", settings, { headers: { "Authorization": `Bearer ${idToken}` } });
    return updatedSettings.data
}
