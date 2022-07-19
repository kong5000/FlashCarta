import React from 'react';
import './HomePage.css'
import { BR } from 'country-flag-icons/react/3x2'
import HomePageIcon from './HomePageIcon';
import SignIn from '../SignIn';
import { useState } from 'react'
import {
    useNavigate
} from "react-router-dom";
const HomePage = ({setUser}) => {
    const [signInVisible, setSignInVisible] = useState(false)
    const navigate = useNavigate()

    return (
        <div className='home-page'>
            <div className='stars'></div>
            <div className='shine-pattern'></div>
            <div >
                {signInVisible ? <SignIn setUser={setUser}/>
                    : <div className='home-page-content'>
                        <HomePageIcon animation='pencil' />
                        <div className='welcome-text'>Learn Portuguese with Cartão</div>
                        <div className='sub-heading'>Frequency dictionary flashcards teach you the most important words first</div>
                        <button className='start-button' onClick={() => setSignInVisible(true)}>Start Learning</button>
                    </div>} 
            </div>
        </div>
    );
};
export default HomePage;