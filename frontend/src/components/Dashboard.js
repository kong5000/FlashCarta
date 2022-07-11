import React, { useEffect, useState } from 'react'
import Categories from './Categories'
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore'
import 'firebase/compat/auth';
import { loadStripe } from '@stripe/stripe-js';
import { getDeckByCategory } from '../services/api';
import { useNavigate } from "react-router-dom"
import NavBar from './NavBar'
import ExerciseModal from './ExerciseModal';

const Dashboard = ({ user }) => {
  const [activePage, setActivePage] = useState('study')
  const [exerciseActive, setExerciseActive] = useState(false)
  const [loading, setLoading] = useState(true)
  const TEST_DECK = [
    {
      "_id": "62c79135eff49970af80aec5",
      "lastSeen": "2022-07-08T02:06:45.921Z",
      "user": "JCw61e6wnjgrjE7CetVKxHKVteq2",
      "priority": 0,
      "ignored": false,
      "language": "pt",
      "ranking": 5524,
      "word": "alho",
      "definition": "garlic",
      "type": "nm",
      "creator": null,
      "category": "food",
      "__v": 0
    },
    {
      "_id": "62c79135eff49970af80aec6",
      "lastSeen": "2022-07-08T02:06:45.921Z",
      "user": "JCw61e6wnjgrjE7CetVKxHKVteq2",
      "priority": 0,
      "ignored": false,
      "language": "pt",
      "ranking": 2417,
      "word": "alimentação",
      "definition": "food",
      "type": "nf",
      "creator": null,
      "category": "food",
      "__v": 0
    },
    {
      "_id": "62c79135eff49970af80aec7",
      "lastSeen": "2022-07-08T02:06:45.921Z",
      "user": "JCw61e6wnjgrjE7CetVKxHKVteq2",
      "priority": 0,
      "ignored": false,
      "language": "pt",
      "ranking": 1509,
      "word": "alimento",
      "definition": "food",
      "type": "nm",
      "creator": null,
      "category": "food",
      "__v": 0
    },
    {
      "_id": "62c79135eff49970af80aec8",
      "lastSeen": "2022-07-08T02:06:45.921Z",
      "user": "JCw61e6wnjgrjE7CetVKxHKVteq2",
      "priority": 0,
      "ignored": false,
      "language": "pt",
      "ranking": 2385,
      "word": "almoço",
      "definition": "lunch",
      "type": "nm",
      "creator": null,
      "category": "food",
      "__v": 0
    },
    {
      "_id": "62c79135eff49970af80aec9",
      "lastSeen": "2022-07-08T02:06:45.921Z",
      "user": "JCw61e6wnjgrjE7CetVKxHKVteq2",
      "priority": 0,
      "ignored": false,
      "language": "pt",
      "ranking": 1990,
      "word": "arroz",
      "definition": "rice",
      "type": "nm",
      "creator": null,
      "category": "food",
      "__v": 0
    },
    {
      "_id": "62c79135eff49970af80aeca",
      "lastSeen": "2022-07-08T02:06:45.921Z",
      "user": "JCw61e6wnjgrjE7CetVKxHKVteq2",
      "priority": 0,
      "ignored": false,
      "language": "pt",
      "ranking": 3174,
      "word": "azeite",
      "definition": "olive oil",
      "type": "nm",
      "creator": null,
      "category": "food",
      "__v": 0
    }
  ]
  const [deck, setDeck] = useState(null)

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
    setLoading(true)
    const idToken = await firebase.auth().currentUser.getIdToken(/* forceRefresh */ true)
    const deck = await getDeckByCategory(idToken, 'pt', category)
    console.log(deck)

    setDeck(TEST_DECK)
    /**@todo sort card (or do the sorting on the backend) */
    setLoading(false)
  }

  const signOut = () => {
    firebase.auth().signOut()
    localStorage.removeItem("user")
    navigate('/')
  }
  useEffect(() => {

  }, [activePage])

  return (
    <div id="main-div"
      tabIndex="0">
      <NavBar activePage={activePage} setActivePage={setActivePage} />
      <h1>My App</h1>
      {user && <p>Welcome {user.displayName}! You are now signed-in!</p>}
      <a onClick={signOut}>Sign-out</a>
      <button onClick={sendToCheckout}>TEST HELLLO </button>
      <button onClick={sendToCustomerPoral}>Customer Portal </button>
      {activePage === 'study' &&
        <Categories
          setActivePage={setActivePage}
          setExerciseActive={setExerciseActive}
          categoryClickHandler={categoryClickHandler}
        />
      }
      {activePage === 'stats' && <div>Stats Page</div>}
      {activePage === 'shop' && <div>Shop Page</div>}
      {activePage === 'settings' && <div>Settings Page</div>}
      {activePage === 'edit' && <div>Edit Page</div>}
      <ExerciseModal
        loading={loading}
        setLoading={setLoading}
        exerciseActive={exerciseActive}
        setExerciseActive={setExerciseActive}
        deck={deck}
      />
    </div>
  )
}

export default Dashboard;
