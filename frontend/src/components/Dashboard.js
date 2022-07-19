import React, { useEffect, useState } from 'react'
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore'
import 'firebase/compat/auth';
import { getDeckByCategory, getDeckByRanking, getUserStats, getUserInfo } from '../services/api';
import { useNavigate } from "react-router-dom"
import NavBar from './NavBar'
import ExerciseModal from './ExerciseModal';
import StudyPage from './StudyPage/StudyPage';
import NewCardModal from './NewCardModal/NewCardModal'
import StorePage from './StorePage/StorePage';
import LockedPage from './LockedPage';
import SettingsPage from './SettingsPage/SettingsPage';
import UnderConstructionPage from './LoadingPage/UnderConstructionPage';

const EXERCISE_SIZE = 5

const Dashboard = ({ user, logout }) => {
  const [userStats, setUserStats] = useState(null)
  const [activePage, setActivePage] = useState('study')
  const [exerciseActive, setExerciseActive] = useState(false)
  const [newCardActive, setNewCardActive] = useState(false)
  const [loading, setLoading] = useState(true)
  const [userInfo, setUserInfo] = useState({})

  const setExerciseState = (state) => {
    setExerciseActive(state)
    updateStats()
  }

  const [deck, setDeck] = useState(null)

  const navigate = useNavigate()

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
        deck = await getDeckByRanking(idToken, 'pt', category, userInfo.cardsPerSession)
      } else {
        deck = await getDeckByCategory(idToken, 'pt', category, userInfo.cardsPerSession)
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
    const userInfo = await getUserInfo(idToken)
    setUserInfo(userInfo)
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
  const hasSubscription = (userInfo) => {
    console.log('hasSubscription')
    console.log(userInfo)
    if (userInfo && userInfo.subscription) return true
    return false
  }
  return (
    <div id="main-div dashboard"
      tabIndex="0">
      <NavBar activePage={activePage} setActivePage={setActivePage} logout={logout}/>
      {activePage === 'study' &&
        <StudyPage
          userStats={userStats}
          setActivePage={setActivePage}
          setExerciseActive={setExerciseState}
          setNewCardActive={setNewCardActive}
          categoryClickHandler={categoryClickHandler}
        />
      }
      {activePage === 'stats' && <UnderConstructionPage/>}
      {activePage === 'shop' && <StorePage user={user} />}
      {activePage === 'settings' && userInfo.subscription && <SettingsPage />}
      {activePage === 'settings' && <SettingsPage userSettings={userInfo} updateUserInfo={updateStats} />}
      {/* {activePage === 'settings' && !userInfo.subscription && <LockedPage locked={true} />} */}
      <ExerciseModal
        updateStats={updateStats}
        loading={loading}
        setLoading={setLoading}
        exerciseActive={exerciseActive}
        setExerciseActive={setExerciseActive}
        setActivePage={setActivePage}
        deck={deck}
      />
      <NewCardModal setNewCardActive={setNewCardActive} newCardActive={newCardActive} />
    </div>
  )
}

export default Dashboard;
