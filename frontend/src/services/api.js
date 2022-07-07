import axios from 'axios';
const BASE_URL = "http://localhost:5001"

// export const getDeck = async (idToken, requestInfo) => {
//     const generateUrl = (requestInfo) => {
//         const { start, end, language } = requestInfo
//         return BASE_URL + `/get-deck/${language}/${start}/${end}`
//     }
//     const res = await axios.get(generateUrl(requestInfo), { headers: { "Authorization": `Bearer ${idToken}` } });
//     return res.data
// }
export const getDeck = async (idToken, language, set) => {
    const res = await axios.get(BASE_URL + `/get-deck/${language}/${set}`, { headers: { "Authorization": `Bearer ${idToken}` } });
    return res.data
}

export const getDeckByCategory = async (idToken, language, category) => {
    console.log(category)
    const res = await axios.get(BASE_URL + `/get-deck-category/${language}/${category}`, { headers: { "Authorization": `Bearer ${idToken}` } });
    return res.data
}

export const upsertCard = async (idToken, card) => {
    await axios.post(BASE_URL + "/add-card", card, { headers: { "Authorization": `Bearer ${idToken}` } })
}

