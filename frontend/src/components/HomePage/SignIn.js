import { React } from 'react'
import FirebaseLogin from './FirebaseLogin'

const SignIn = ({ setUser }) => {
    return (
        <div className='sign-in-container'>
            <h1 className='welcome-text'>Sign up or Sign in</h1>
            <FirebaseLogin setUser={setUser} />
        </div>
    )
}

export default SignIn