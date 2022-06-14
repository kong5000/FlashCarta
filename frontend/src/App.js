import './App.css';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { useEffect, useState } from 'react';
import axios from 'axios';
import FirebaseLogin from './firebase'

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

  const testBackend = async () => {
    try{
      const idToken = await firebase.auth().currentUser.getIdToken(/* forceRefresh */ true)
      console.log(idToken)
      // await axios.post('http://localhost:5001/add-card', {idToken})
      await axios.get('http://localhost:5001/get-deck', { headers: {"Authorization" : `Bearer ${idToken}`} });
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
    });
    return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
  }, []);
  if (!user) {
    return (
      <div>
        <h1>My App</h1>
        <p>Please sign-in:</p>
        <FirebaseLogin setUser={setUser}/>
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
