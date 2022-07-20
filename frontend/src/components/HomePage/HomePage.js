import React from 'react';
import './HomePage.css'
import HomePageIcon from './HomePageIcon';
import SignIn from './SignIn';
import { useState } from 'react'
const HomePage = ({setUser}) => {
    const [signInVisible, setSignInVisible] = useState(false)
    return (
        <div className='home-page'>
            <div className='stars'></div>
            <div className='shine-pattern'></div>
            <div >
                {signInVisible ? <SignIn setUser={setUser}/>
                    : <div className='home-page-content'>
                        <HomePageIcon animation='pencil' />
                        <div className='welcome-text'>Learn Portuguese with FlashCarta</div>
                        <div className='sub-heading'>Frequency dictionary flashcards teach you the most important words first</div>
                        <button className='start-button' onClick={() => setSignInVisible(true)}>Start Learning</button>
                    </div>} 
            </div>
        </div>
    );
};
export default HomePage;