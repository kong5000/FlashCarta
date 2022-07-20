const express = require('express');
const auth = require('./auth')
const stripe = require('stripe')(process.env.STRIPE_KEY);
const router = express.Router();

router.post('/stripe', async (req, res) => {
    // const customer = await stripe.customers.retrieve(
    //   'cus_LxyROGlhG4S005'
    // );
    // const uid = customer.metadata.firebaseUID
})

router.get('/checkout', auth.isAuthorized, async (req, res) => {
    const session = await stripe.checkout.sessions.create({
        success_url: 'http://localhost:3000/dashboard',
        cancel_url: 'http://localhost:3000/dashboard',
        line_items: [
            { price: 'price_1LMMYOHLjVvtqNCUQ4ItfAjS', quantity: 1 }
        ],
        mode: 'subscription',
        discounts: [{
            coupon: 'Id4ga1cR',
        }],
    })
    console.log(session)
    return res.status(200).send(session)
})

module.exports = router;
