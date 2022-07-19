import React from 'react';
import './HomePage.css'
import { BR } from 'country-flag-icons/react/3x2'
import HomePageIcon from './HomePageIcon';
import CreateButton from '../CreateButton/CreateButton';
const HomePage = () => {
    return (
        <div className='home-page'>
            {/* <div className='home-page-bar'></div> */}
            <div className='home-overlay'></div>
            <div className='stars'></div>
            <div className='shine-pattern'></div>
            <div className='home-page-left'>   <BR title="Brazil" className="country-flag"/>  </div>
            <div className='home-page-right'>
            <button>HELLO WORLD</button>
            <CreateButton setNewCardActive={() => {}} />

                <div className='info-container'>
                </div>
            </div>
        
        </div>
    );
};
export default HomePage;