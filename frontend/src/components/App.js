import './App.css';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore'
import 'firebase/compat/auth';
import 'firebase/compat/functions'
import { useEffect, useState } from 'react';
import SignIn from './HomePage/SignIn';
import Dashboard from './Dashboard/Dashboard';
import HomePage from './HomePage/HomePage';
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
  const navigate = useNavigate()

  useEffect(() => {
    document.title = "Flash Carta";
    let userFromLocalStorage = localStorage.getItem('user')
    if (userFromLocalStorage) {
      setUser(JSON.parse(userFromLocalStorage))
    }
    const unregisterAuthObserver = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        localStorage.setItem('user', JSON.stringify(user))
        setUser(user);
        navigate('/dashboard')
      }
    });
    return () => unregisterAuthObserver(); //remove Firebase observers when the component unmounts.
  }, []);

  const logout = () => {
    firebase.auth().signOut().then(function() {
      navigate('/')
    }).catch(function(error) {
    });
  }

  return (
    <Routes>
      <Route path="/sign-in" exact element={<SignIn setUser={setUser} />} />
      {user && <Route path="/dashboard" element={<Dashboard user={user} logout={logout}/>} />}
      <Route path="/" exact element={<HomePage setUser={setUser}/>} />
    </Routes>
  );
}

export default App;
