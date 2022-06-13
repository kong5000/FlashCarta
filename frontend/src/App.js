import logo from './logo.svg';
import './App.css';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { useEffect, useState } from 'react';
import axios from 'axios';

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

const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: 'popup',
  // We will display Google and Facebook as auth providers.
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID
  ],
  callbacks: {
    // Avoid redirects after sign-in.
    signInSuccessWithAuthResult: () => false,
  },
};



const App = () => {
  const [user, setUser] = useState(false); // Local signed-in state.

  const testBackend = async () => {
    try{
      const idToken = await firebase.auth().currentUser.getIdToken(/* forceRefresh */ true)
      await axios.post('http://localhost:5001/add-card', {idToken})
    }catch(err){
      /**@todo trigger error message for user */
      if(err.response){
        console.log(err.response.data)
      }
    }
  }
  // // Listen to the Firebase Auth state and set the local state.
  useEffect(() => {
    const unregisterAuthObserver = firebase.auth().onAuthStateChanged(user => {
      setUser(user);
      console.log(user)
      console.log(user.displayName)

    });
    return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
  }, []);
  if (!user) {
    return (
      <div>
        <h1>My App</h1>
        <p>Please sign-in:</p>
        <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
      </div>
    );
  }
  return (
    <div>
      <h1>My App</h1>
      <p>Welcome {firebase.auth().currentUser.displayName}! You are now signed-in!</p>
      <a onClick={() => firebase.auth().signOut()}>Sign-out</a>
      <button onClick={testBackend}>TEST</button>
    </div>
  );
}

export default App;
