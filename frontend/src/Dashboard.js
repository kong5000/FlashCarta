import React from 'react'
import Categories from './Categories'
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore'
import 'firebase/compat/auth';
import { loadStripe } from '@stripe/stripe-js';
import { getDeckByCategory } from './services/api';
import { useNavigate } from "react-router-dom"
const Dashboard = ({ user }) => {
  const navigate = useNavigate()

  const sendToCheckout = async () => {
    let doc = await firebase.default
      .firestore()
      .collection('users')
      .doc(user.uid)
      .collection('checkout_sessions')
      .add({
        price: 'price_1LG1teHLjVvtqNCUyiUuVc0u',
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
  }
  const sendToCustomerPoral = async () => {
    const functionRef = firebase
      .functions()
      .httpsCallable('ext-firestore-stripe-payments-createPortalLink')
    const { data } = await functionRef({ returnUrl: window.location.origin })
    window.location.assign(data.url)
  }

  const categoryClickHandler = async (category) => {
    const idToken = await firebase.auth().currentUser.getIdToken(/* forceRefresh */ true)

    const deck = await getDeckByCategory(idToken, 'pt', category)
    console.log(deck)
    navigate('/exercise')
  }

  const signOut = () => {
    firebase.auth().signOut()
    localStorage.removeItem("user")
    navigate('/')
  }

  return (
    <div id="main-div"
      tabIndex="0">
      <h1>My App</h1>
      {user && <p>Welcome {user.displayName}! You are now signed-in!</p>}
      <a onClick={signOut}>Sign-out</a>
      <button onClick={sendToCheckout}>TEST HELLLO </button>
      <button onClick={sendToCustomerPoral}>Customer Portal </button>
      <Categories categoryClickHandler={categoryClickHandler} />
    </div>
  )
}

export default Dashboard;
