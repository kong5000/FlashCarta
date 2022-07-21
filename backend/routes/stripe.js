const express = require('express');
const auth = require('./auth')
const stripe = require('stripe')(process.env.STRIPE_KEY);
const router = express.Router();
const { addSubscription } = require('../controllers/user')

router.post('/stripe', express.raw({ type: 'application/json' }), async (request, response) => {
    const sig = request.headers['stripe-signature'];

    let event;

    try {
        event = stripe.webhooks.constructEvent(request.body, sig, process.env.STRIPE_ENDPOINT_SECRET);
        if (event.type === 'checkout.session.completed') {
            console.log("CHECKOUT SESSION COMPLETED")
            console.log(event.data.object)
            const checkoutSession = event.data.object
            const customerDetails = checkoutSession.customer_details
            await addSubscription(customerDetails.email)
        }
    } catch (err) {
        console.log(err)
        return response.status(400).send(`Webhook Error: ${err.message}`);
    }
    return response.status(200).send('Event Ack');
});

router.get('/checkout', auth.isAuthorized, async (req, res) => {
    try {
        const user = res.locals.user
        const email = user.email
        const customer = user.customerId
        const session = await stripe.checkout.sessions.create({
            customer_email: email,
            success_url: 'https://flashcarta.com/dashboard',
            cancel_url: 'https://flashcarta.com/dashboard',
            line_items: [
                { price: 'price_1LMMYOHLjVvtqNCUQ4ItfAjS', quantity: 1 }
            ],
            mode: 'subscription',
            discounts: [{
                coupon: 'Id4ga1cR',
            }],
        })
        return res.status(200).send(session)
    } catch (err) {
        return res.status(400).send('Could not generate checkout session')
    }
})

module.exports = router;
