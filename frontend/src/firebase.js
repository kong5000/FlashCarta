// import React, { useEffect, useState } from 'react';
// import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
// import firebase from 'firebase/compat/app';
// import 'firebase/compat/auth';

// const firebaseConfig = {
//     apiKey: "AIzaSyAN1juJdKNwSJDoF69STf2qVVvNT3_DYss",
//     authDomain: "flash-card-app-351417.firebaseapp.com",
//     projectId: "flash-card-app-351417",
//     storageBucket: "flash-card-app-351417.appspot.com",
//     messagingSenderId: "304964565264",
//     appId: "1:304964565264:web:08333823ae335e5c160d95",
//     measurementId: "G-BSZENGC3PV"
// };
// firebase.initializeApp(firebaseConfig);

// // Configure FirebaseUI.
// const uiConfig = {
//   // Popup signin flow rather than redirect flow.
//   signInFlow: 'popup',
//   // We will display Google and Facebook as auth providers.
//   signInOptions: [
//     firebase.auth.GoogleAuthProvider.PROVIDER_ID,
//     firebase.auth.FacebookAuthProvider.PROVIDER_ID
//   ],
//   callbacks: {
//     // Avoid redirects after sign-in.
//     signInSuccessWithAuthResult: () => false,
//   },
// };

// const SignInScreen = () => {
//   const [isSignedIn, setIsSignedIn] = useState(false); // Local signed-in state.

//   // Listen to the Firebase Auth state and set the local state.
// //   useEffect(() => {
// //     const unregisterAuthObserver = firebase.auth().onAuthStateChanged(user => {
// //       setIsSignedIn(!!user);
// //     });
// //     return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
// //   }, []);
//   if (!isSignedIn) {
//     return (
//       <div>
//         <h1>My App</h1>
//         <p>Please sign-in:</p>
//         <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
//       </div>
//     );
//   }
//   return (
//     <div>
//       <h1>My App</h1>
//       <p>Welcome {firebase.auth().currentUser.displayName}! You are now signed-in!</p>
//       <a onClick={() => firebase.auth().signOut()}>Sign-out</a>
//     </div>
//   );
// }

// export default SignInScreen;