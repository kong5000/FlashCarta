import './App.css';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { useEffect, useState } from 'react';
import { getDeck, addCard } from './services/api';
import FirebaseLogin from './firebase'
import Card from './Card'
import { getContrastRatio } from '@mui/material';

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
  const [user, setUser] = useState(false); // Local signed-in state.
  const [cardOpen, setCardOpen] = useState(false)
  const [activeCardIndex, setActiveCardIndex] = useState(0)
  const [deck, setDeck] = useState(null)

  const handleKeyDown = (e) => {
    if(cardOpen){
      if(e.key === " " || e.key === "Enter") return //Space and enter seem to convert to numbers, reject them explicitly

      if(Number.isInteger(Number(e.key)) && Number(e.key) <= 3){
        setActiveCardIndex(activeCardIndex + 1)
        setCardOpen(false)
      }
    }else{
      if(e.key == " " || e.key == "Enter"){
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
  // // Listen to the Firebase Auth state and set the local state.
  useEffect(() => {
    const unregisterAuthObserver = firebase.auth().onAuthStateChanged(user => {
      setUser(user);
    });
    return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
  }, []);
  if (!user) {
    return (
      <div>
        <h1>My App</h1>
        <p>Please sign-in:</p>
        <FirebaseLogin setUser={setUser} />
      </div>
    );
  }
  return (
    <div id="main-div" onKeyDown={handleKeyDown}
    tabIndex="0">
      <Card setCardOpen={setCardOpen} cardOpen={cardOpen} activeCardIndex={activeCardIndex} deck={deck}/>
      <h1>My App</h1>
      {cardOpen}

      <p>Welcome {firebase.auth().currentUser.displayName}! You are now signed-in!</p>
      <a onClick={() => firebase.auth().signOut()}>Sign-out</a>
      <button onClick={testBackend}>TEST</button>
    </div>
  );
}

export default App;
