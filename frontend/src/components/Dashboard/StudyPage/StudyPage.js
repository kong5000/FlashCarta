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
                    <div className='custom-study-icon-container'>
                        <CreateButton setNewCardActive={setNewCardActive} />
                        <Icon
                            label={'Custom'}
                            animation={'notes'}
                            category={'custom'}
                            onClick={categoryClickHandler}
                            setExerciseActive={setExerciseActive}
                        />
                    </div>
                </div>
                {userInfo && userInfo.subscription ? <StatsWindow userStats={userStats}/> : <LockedWindow/>}
            </div>
        </div>
    );
};

export default StudyPage;