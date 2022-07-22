import React, { useState } from 'react';
import './StorePage.css'
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore'
import 'firebase/compat/auth';
import { loadStripe } from '@stripe/stripe-js';
import BuyPremium from './BuyPremium';
import Spinner from '../../Spinner/Spinner';
import { Typography } from '@mui/material';
import { getCheckoutSession } from '../../../services/api'
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
                    <div className='shop-item-description'>
                        <div className='shop-item-label' >
                            Premium Subscription (Free)
                        </div>
                        <div>
                            Unlock the word rating tracker, and more features to come.
                        </div>
                    </div>
                    <BuyPremium onClick={sendToCheckout} />
                </div>

            }
        </div>
    );
};

export default StorePage;