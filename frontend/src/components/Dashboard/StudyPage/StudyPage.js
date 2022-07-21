import React from 'react';
import Categories from './Categories';
import './StudyPage.css'
import Icon from '../../Icon/Icon';
import CreateButton from '../../Dashboard/CardModal/CreateButton';
import StatsWindow from '../StatsWindow/StatsWindow';
import LockedWindow from '../StatsWindow/LockedWindow';
import { Typography } from '@mui/material';
const StudyPage = ({ userInfo, setExerciseActive, categoryClickHandler, setNewCardActive, userStats }) => {
    return (
        <div className='study-page'>
            <Categories
                userStats={userStats}
                setExerciseActive={setExerciseActive}
                categoryClickHandler={categoryClickHandler} />
            <div className='study-page-right-side'>
                <div className='study-page-container'>
                    <h2 className='exercise-word' variant="h5" >
                        Custom Deck
                    </h2>
                    <div className='custom-study-icon-container'>
                        <CreateButton setNewCardActive={setNewCardActive} />
                        <Icon
                            label={'Practice'}
                            animation={'notes'}
                            category={'custom'}
                            onClick={categoryClickHandler}
                            setExerciseActive={setExerciseActive}
                        />
                    </div>
                </div>
                {userInfo && userInfo.subscription ? <StatsWindow /> : <LockedWindow/>}
            </div>
        </div>
    );
};

export default StudyPage;