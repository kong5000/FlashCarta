import React, { useState } from 'react';
import './StorePage.css'
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore'
import 'firebase/compat/auth';
import { loadStripe } from '@stripe/stripe-js';
import BuyPremium from './BuyPremium';
import Spinner from '../Spinner/Spinner';
import { Typography } from '@mui/material';
const StorePage = ({ user }) => {
    const [redirecting, setRedirecting] = useState(false)

    const sendToCheckout = async () => {
        setRedirecting(true)
        try {

            let doc = await firebase.default
                .firestore()
                .collection('users')
                .doc(user.uid)
                .collection('checkout_sessions')
                .add({
                    price: 'price_1LMMYOHLjVvtqNCUQ4ItfAjS',
                    success_url: window.location.origin,
                    cancel_url: window.location.origin
                })
                .then((docRef) => {
                    docRef.onSnapshot(async (snap) => {
                        const { error, sessionId } = snap.data()
                        if (error) {
                            alert(`Error with firebase ${error.message}`)
                        }
                        if (sessionId) {
                            const stripe = await loadStripe('pk_test_51HbtriHLjVvtqNCUdeNqD2LmQKxykYCZDPyA6U2iP8lWacRyJcF42XV9p8OtqHh5eiCykijbKaVTcKefoTEM3lOO00dGsZRblp');
                            await stripe.redirectToCheckout({ sessionId })
                        }
                    })
                })
            console.log(doc)

        } catch (err) {
            console.log(err)
            setRedirecting(false)
        }
    }


    return (
        <div className='store-page'>
            {redirecting ? <div>
                <Spinner />
                <Typography variant="h5" >
                    Redirecting to checkout
                </Typography>
            </div>
                :
                <div className='subscription-container'>
                    <div>
                        <Typography variant="h6" >
                            Premium Subscription (Free)
                        </Typography>
                        <div>
                            A premium subscription gives you access to the user settings page. Choose how many cards per exercise, and learning rate! Follow the instructions after hitting subscribe on how to sign up for free with Stripe
                        </div>
                    </div>
                    <BuyPremium onClick={sendToCheckout} />
                </div>

            }
        </div>
    );
};

export default StorePage;