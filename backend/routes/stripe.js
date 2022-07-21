const express = require('express');
const auth = require('./auth')
const stripe = require('stripe')(process.env.STRIPE_KEY);
const router = express.Router();

router.post('/stripe', express.raw({ type: 'application/json' }), async (request, response) => {
    const sig = request.headers['stripe-signature'];

    let event;

    try {
        event = stripe.webhooks.constructEvent(request.body, sig, process.env.STRIPE_ENDPOINT_SECRET);
    } catch (err) {
        response.status(400).send(`Webhook Error: ${err.message}`);
        return;
    }
    console.log(event.type)
    // Handle the event
    // const customer = await stripe.customers.retrieve(
    //   'cus_LxyROGlhG4S005'
    // );
    // const uid = customer.metadata.firebaseUID
    if (event.type === 'customer.subscription.created') {
        console.log("SUBSCRIPTION CREATED")

        const subscription = event.data.object;
        const customerInfo = await stripe.customers.retrieve(
            subscription.customer
        );
        console.log(`subcription`)
        console.log(subscription.customer)
        console.log(`customer info`)
        console.log(customerInfo)
        console.log(`customer meta data`)
        console.log(customerInfo.metadata)
        const uid = customerInfo.metadata.firebaseUID

        console.log(uid)
    }

    // Return a 200 response to acknowledge receipt of the event
    response.send();
});

router.get('/checkout', auth.isAuthorized, async (req, res) => {
    const session = await stripe.checkout.sessions.create({
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
    console.log(session)
    return res.status(200).send(session)
})

module.exports = router;
