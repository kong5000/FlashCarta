import React, { useEffect, useState } from 'react'
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore'
import 'firebase/compat/auth';
import { getDeckByCategory, getDeckByRanking, getUserStats, getUserInfo } from '../../services/api';
import NavBar from './navigation/NavBar'
import ExerciseModal from '../ExercisePage/ExerciseModal';
import StudyPage from './StudyPage/StudyPage';
import NewCardModal from './CardModal/NewCardModal'
import StorePage from './StorePage/StorePage';
import SettingsPage from './SettingsPage/SettingsPage';
import UnderConstructionPage from '../ExercisePage/LoadingPage/UnderConstructionPage'
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Dashboard = ({ user, logout }) => {
  const [userStats, setUserStats] = useState(null)
  const [activePage, setActivePage] = useState('study')
  const [exerciseActive, setExerciseActive] = useState(false)
  const [newCardActive, setNewCardActive] = useState(false)
  const [loading, setLoading] = useState(true)
  const [userInfo, setUserInfo] = useState({})
  const [errorOpen, setErrorOpen] = useState(false)
  const [errorMessage, setErrorMessage] = useState('Sorry there was an error')
  const setExerciseState = (state) => {
    setExerciseActive(state)
    updateStats()
  }

  const [deck, setDeck] = useState(null)

  const handleCloseSnack = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setErrorOpen(false)
    setExerciseActive(false)
  };
  const isRankingCategory = (category) => {
    return (category === '50' || category === '100' || category === '150' || category === '200')
  }

  const categoryClickHandler = async (category) => {
    setLoading(true)
    if(category !== 'custom'){
      setExerciseActive(true)
    }

    try {
      const idToken = await firebase.auth().currentUser.getIdToken(/* forceRefresh */ true)
      let deck = null
      if (isRankingCategory(category)) {
        deck = await getDeckByRanking(idToken, 'pt', category, userInfo.cardsPerSession)
      } else {
        deck = await getDeckByCategory(idToken, 'pt', category, userInfo.cardsPerSession)
      }
      if (deck.length > 0) {
        setDeck(deck)
        setExerciseActive(true)
      }else if(category === 'custom'){
        setErrorMessage('Your custom deck is empty, try adding cards first')
        setErrorOpen(true)
      }
    } catch (err) {
      console.log(err)
      setErrorMessage('Sorry, something went wrong, try again later')
      setErrorOpen(true)
    } finally {
      setLoading(false)
    }
  }

  const updateStats = async () => {
    try{
      const idToken = await firebase.auth().currentUser.getIdToken(/* forceRefresh */ true)
      const userInfo = await getUserInfo(idToken)
      console.log(userInfo)
      setUserInfo(userInfo)
      let userStats = await getUserStats(idToken)
      setUserStats(userStats)
    }catch(err){
      console.log(err)
    }
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
      <NavBar activePage={activePage} setActivePage={setActivePage} logout={logout} />
      {activePage === 'study' &&
        <StudyPage
          userStats={userStats}
          setActivePage={setActivePage}
          setExerciseActive={setExerciseState}
          setNewCardActive={setNewCardActive}
          categoryClickHandler={categoryClickHandler}
        />
      }
      {activePage === 'stats' && <UnderConstructionPage />}
      {activePage === 'shop' && <StorePage user={user} />}
      {activePage === 'settings' && <SettingsPage userSettings={userInfo} updateUserInfo={updateStats} />}
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
      <Snackbar open={errorOpen} autoHideDuration={6000} onClose={handleCloseSnack}>
        <Alert onClose={handleCloseSnack} severity="error" sx={{ width: '100%' }}>
          {errorMessage}
        </Alert>
      </Snackbar>
    </div>
  )
}

export default Dashboard;
