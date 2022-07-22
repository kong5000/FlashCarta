const express = require('express');
const router = express.Router();
const auth = require('./auth')
const { updateUserSettings, getUser, createUser, getUserStatistics } = require('../controllers/user')

router.get('/user-data', auth.isAuthorized, async (req, res) => {
    //Return Settings, Stats, and Card Stack
    const user = res.locals.user
    try {
        let userInfoResult = await getUser(user.uid)
        let isNewUser = false
        if (!userInfoResult.length) {
            userInfoResult = await createUser(user.uid, user.email)
            isNewUser = true
        }
        let userInfo = userInfoResult[0]
        res.status(200).send({userInfo: userInfo, isNewUser})
    } catch (err) {
        console.log(err)
        return res.status(400).send(err)
    }
})

router.get('/get-statistics', auth.isAuthorized, async (req, res) => {
    const user = res.locals.user
    try {
        const stats = await getUserStatistics(user.uid)
        return res.status(200).send(stats)
    } catch (err) {
        console.log(err)
        return res.status(400).send('Could not retrieve user statistics')
    }
})

router.post(`/update-settings`, auth.isAuthorized, async (req, res) => {
    const user = res.locals.user
    const settings = req.body
    try {
        await updateUserSettings(user.uid, settings)
        return res.status(200).send()
    } catch (err) {
        console.log(err)
        return res.status(400).send('Could not update user settings')
    }
})

module.exports = router;
