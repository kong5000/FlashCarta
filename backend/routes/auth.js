var admin = require("firebase-admin");

admin.initializeApp({
    credential: admin.credential.cert({
        "project_id": process.env.FIREBASE_PROJECT_ID,
        "private_key": process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
        "client_email": process.env.FIREBASE_CLIENT_EMAIL,
    })
});

exports.isAuthorized = async function (req, res, next) {
    try {
        const authHeader = req.headers.authorization;
        const idToken = authHeader.split(' ')[1];
        const decodedToken = await admin.auth().verifyIdToken(idToken)
        res.locals.user = decodedToken
        return next()
    } catch (err) {
        console.log(err.message)
        return res.status(400).send("Firebase authentication error")
        // return next(err)
    }
}