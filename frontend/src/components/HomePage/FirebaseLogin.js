import React, { useEffect } from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase/compat/app';

const firebaseConfig = {
    apiKey: "AIzaSyAN1juJdKNwSJDoF69STf2qVVvNT3_DYss", //Apparently safe to expose this, just an identifier
    authDomain: "flash-card-app-351417.firebaseapp.com",
    projectId: "flash-card-app-351417",
    storageBucket: "flash-card-app-351417.appspot.com",
    messagingSenderId: "304964565264",
    appId: "1:304964565264:web:08333823ae335e5c160d95",
    measurementId: "G-BSZENGC3PV"
};
firebase.initializeApp(firebaseConfig);

const uiConfig = {
    signInFlow: 'popup',
    signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
        firebase.auth.GithubAuthProvider.PROVIDER_ID],
    callbacks: {
        signInSuccessWithAuthResult: () => false,
    },
};

const FirebaseLogin = ({ setUser }) => {
    useEffect(() => {
        const unregisterAuthObserver = firebase.auth().onAuthStateChanged(user => {
            setUser(user);
            console.log(user)
        })
    });

    // const signInAnonymously = () => {
    //     firebase.auth().signInAnonymously().catch(alert);
    // }

    return (
        <>
            <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
            {/* <button onClick={signInAnonymously}>Test</button> */}
        </>
    )
}

export default FirebaseLogin