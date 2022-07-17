import React from 'react';
import Categories from '../Categories';
import './StudyPage.css'
import Icon from '../Icon/Icon';
import CreateButton from '../CreateButton/CreateButton';
import StatsWindow from '../StatsWindow/StatsWindow';
import { Typography } from '@mui/material';
const StudyPage = ({ setExerciseActive, categoryClickHandler, setNewCardActive, userStats }) => {
    return (
        <div className='study-page'>
            <Categories
                userStats={userStats}
                setExerciseActive={setExerciseActive}
                categoryClickHandler={categoryClickHandler} />
            <div className='study-page-right-side'>
                <div className=' study-page-container'>
                    <Typography className='exercise-word' variant="h5" >
                        Custom Deck
                    </Typography>
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
                <StatsWindow />
            </div>
        </div>
    );
};

export default StudyPage;