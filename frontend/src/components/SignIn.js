import { React } from 'react'
import FirebaseLogin from './FirebaseLogin'

const SignIn = ({ setUser }) => {
    return (
        <div>
            <h1>My App</h1>
            <p>Please sign-in:</p>
            <FirebaseLogin setUser={setUser} />
        </div>
    )
}

export default SignIn