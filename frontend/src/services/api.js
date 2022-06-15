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
export const addCard = async (idToken, data) => {
    await axios.post(BASE_URL + "/add-card", { headers: { "Authorization": `Bearer ${idToken}` } }, { data })
}