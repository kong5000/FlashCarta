var admin = require("firebase-admin");
var serviceAccount = require("./keyfile.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

exports.isAuthorized = async function (req, res, next) {
    const authHeader = req.headers.authorization;
    const idToken = authHeader.split(' ')[1];
    try {
        const decodedToken = await admin.auth().verifyIdToken(idToken)
        res.locals.user = decodedToken
        return next()
    } catch (err) {
        console.log(err.message)
        return res.status(400).send("Firebase authentication error")
        // return next(err)
    }
}