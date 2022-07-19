import React from 'react';
import './HomePage.css'
import { BR } from 'country-flag-icons/react/3x2'
import HomePageIcon from './HomePageIcon';
import {
    useNavigate
  } from "react-router-dom";
const HomePage = () => {
    const navigate = useNavigate()

    return (
        <div className='home-page'>
            {/* <div className='home-page-bar'></div> */}
            {/* <div className='home-navbar'></div> */}
            <div className='stars'></div>
            <div className='shine-pattern'></div>
            <div className='home-page-content'>
                <HomePageIcon animation='pencil'/>
                <div className='welcome-text'>Learn Portuguese with Cartão</div>
                <div className='sub-heading'>Frequency dictionary guided flashcards teach you the most important words first</div>
                <button className='start-button' onClick={() => navigate('/sign-in')}>Start Learning</button>
            </div>
        </div>
    );
};
export default HomePage;