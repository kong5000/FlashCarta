import './App.css';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore'
import 'firebase/compat/auth';
import 'firebase/compat/functions'
import { useEffect, useState } from 'react';
import { getDeck, upsertCard, getDeckByCategory } from './services/api';
import { loadStripe } from '@stripe/stripe-js';
import SignIn from './SignIn';
import Dashboard from './Dashboard';
import {
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";

const firebaseConfig = {
  apiKey: "AIzaSyAN1juJdKNwSJDoF69STf2qVVvNT3_DYss",
  authDomain: "flash-card-app-351417.firebaseapp.com",
  projectId: "flash-card-app-351417",
  storageBucket: "flash-card-app-351417.appspot.com",
  messagingSenderId: "304964565264",
  appId: "1:304964565264:web:08333823ae335e5c160d95",
  measurementId: "G-BSZENGC3PV"
};
firebase.initializeApp(firebaseConfig);

const App = () => {
  const [user, setUser] = useState(null); // Local signed-in state.
  const [cardOpen, setCardOpen] = useState(false)
  const [activeCardIndex, setActiveCardIndex] = useState(0)
  const [deck, setDeck] = useState(null)
  const navigate = useNavigate()

  const handleKeyDown = (e) => {
    if (cardOpen) {
      if (e.key === " " || e.key === "Enter") return //Space and enter seem to convert to numbers, reject them explicitly

      if (Number.isInteger(Number(e.key)) && Number(e.key) <= 3) {
        recordCardRating(Number(e.key))
        setActiveCardIndex(activeCardIndex + 1)
        setCardOpen(false)
      }
    } else {
      if (e.key == " " || e.key == "Enter") {
        setCardOpen(true)
      }
    }
  }
  const testBackend = async () => {
    try {
      const idToken = await firebase.auth().currentUser.getIdToken(/* forceRefresh */ true)
      const deck = await getDeck(idToken, "pt", 0)
      console.log(deck)
      setDeck(deck)
    } catch (err) {
      /**@todo trigger error message for user */
      if (err.response) {
        console.log(err.response.data)
      }
    }
  }
  const recordCardRating = async (rating) => {
    try {
      const idToken = await firebase.auth().currentUser.getIdToken(/* forceRefresh */ true)
      await upsertCard(idToken, { ...deck[activeCardIndex], rating })
    } catch (err) {
      /**@todo trigger error message for user */
      if (err.response) {
        console.log(err.response.data)
      }
    }
  }
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

  useEffect(() => {
    let userFromLocalStorage = localStorage.getItem('user')
    if (userFromLocalStorage) {
      setUser(JSON.parse(userFromLocalStorage))
    }
  }, [])

  return (
    <Routes>
      <Route path="/sign-in" exact element={<SignIn setUser={setUser} />} />
      {user && <Route path="/dashboard" element={<Dashboard user={user} />} />}
      <Route path="/exercise" element={<div>This is the exercise page</div>} />
      <Route path="/" exact element={<div>Home Page</div>} />
    </Routes>
  );
}

export default App;
