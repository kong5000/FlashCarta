import React, { useState } from 'react';
import './StorePage.css'
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore'
import 'firebase/compat/auth';
import { loadStripe } from '@stripe/stripe-js';
import BuyPremium from './BuyPremium';
import Spinner from '../Spinner/Spinner';
import { Typography } from '@mui/material';
import { getCheckoutSession } from '../../services/api'
const StorePage = ({ user }) => {
    const [redirecting, setRedirecting] = useState(false)

    const sendToCheckout = async () => {
        setRedirecting(true)
        try {
            const idToken = await firebase.auth().currentUser.getIdToken(/* forceRefresh */ true)
            const session = await getCheckoutSession(idToken)
            const stripe = await loadStripe('pk_test_51HbtriHLjVvtqNCUdeNqD2LmQKxykYCZDPyA6U2iP8lWacRyJcF42XV9p8OtqHh5eiCykijbKaVTcKefoTEM3lOO00dGsZRblp')
            await stripe.redirectToCheckout({ sessionId: session.id })
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