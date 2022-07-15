import React, { useEffect, useState } from 'react'
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore'
import 'firebase/compat/auth';
import { loadStripe } from '@stripe/stripe-js';
import { getDeckByCategory, getDeckByRanking, getUserStats } from '../services/api';
import { useNavigate } from "react-router-dom"
import NavBar from './NavBar'
import ExerciseModal from './ExerciseModal';
import StudyPage from './StudyPage/StudyPage';
import NewCardModal from './NewCardModal/NewCardModal'

const EXERCISE_SIZE = 5

const Dashboard = ({ user }) => {
  const [userStats, setUserStats] = useState(null)
  const [activePage, setActivePage] = useState('study')
  const [exerciseActive, setExerciseActive] = useState(false)
  const [newCardActive, setNewCardActive] = useState(false)
  const [loading, setLoading] = useState(true)

  const setExerciseState = (state) => {
    setExerciseActive(state)
    updateStats()
  }

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

  const isRankingCategory = (category) => {
    return (category === '50' || category === '100' || category === '150' || category === '200')
  }

  const categoryClickHandler = async (category) => {
    setLoading(true)
    try {
      const idToken = await firebase.auth().currentUser.getIdToken(/* forceRefresh */ true)
      let deck = null
      if (isRankingCategory(category)) {
        deck = await getDeckByRanking(idToken, 'pt', category, EXERCISE_SIZE)
      } else {
        deck = await getDeckByCategory(idToken, 'pt', category, EXERCISE_SIZE)
      }
      console.log(deck)
      setDeck(deck)
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
    /**@todo sort card (or do the sorting on the backend) */
  }

  const signOut = () => {
    firebase.auth().signOut()
    localStorage.removeItem("user")
    navigate('/')
  }
  const updateStats = async () => {
    const idToken = await firebase.auth().currentUser.getIdToken(/* forceRefresh */ true)
    let userStats = await getUserStats(idToken)
    setUserStats(userStats)
  }
  useEffect(() => {
    try {
      updateStats()
    } catch (err) {
      console.log(err)
    }
  }, [user])

  return (
    <div id="main-div"
      tabIndex="0">
      <NavBar activePage={activePage} setActivePage={setActivePage} />
      {activePage === 'study' &&
        <StudyPage
          userStats={userStats}
          setActivePage={setActivePage}
          setExerciseActive={setExerciseState}
          categoryClickHandler={categoryClickHandler}
        />
      }
      {activePage === 'stats' && <div>Stats Page</div>}
      {activePage === 'shop' && <div>Shop Page</div>}
      {activePage === 'settings' && <div>Settings Page</div>}
      {activePage === 'edit' && <div>Edit Page</div>}
      <ExerciseModal
        updateStats={updateStats}
        loading={loading}
        setLoading={setLoading}
        exerciseActive={exerciseActive}
        setExerciseActive={setExerciseActive}
        setActivePage={setActivePage}
        deck={deck}
      />
      <NewCardModal/>
    </div>
  )
}

export default Dashboard;
