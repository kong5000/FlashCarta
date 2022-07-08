import { React, useEffect } from 'react'
import FirebaseLogin from './firebase'
import firebase from 'firebase/compat/app';
import { useNavigate } from 'react-router-dom'
const SignIn = ({ setUser }) => {
    const navigate = useNavigate()

    useEffect(() => {
        const unregisterAuthObserver = firebase.auth().onAuthStateChanged(user => {
            if (user) {
                localStorage.setItem('user', JSON.stringify(user))
                setUser(user);
                navigate('/dashboard')
            }
        });
        return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
    }, []);
    
    return (
        <div>
            <h1>My App</h1>
            <p>Please sign-in:</p>
            <FirebaseLogin setUser={setUser} />
        </div>
    )
}

export default SignIn