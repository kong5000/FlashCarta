import React from 'react';
import Categories from '../Categories';
import './StudyPage.css'
import Icon from '../Icon/Icon';
import CreateButton from '../CreateButton/CreateButton';
import StatsWindow from '../StatsWindow/StatsWindow';

const StudyPage = ({ setExerciseActive, categoryClickHandler, setActivePage }) => {
    return (
        <div className='study-page'>
            <Categories setExerciseActive={setExerciseActive}
                categoryClickHandler={categoryClickHandler} />
            <div className='study-page-right-side'>
                <div className='custom-study-icon-container study-page-container'>
                    <CreateButton setActivePage={setActivePage} />
                    <Icon
                        label={'Custom Deck'}
                        animation={'notes'}
                        category={'notes'}
                        onClick={categoryClickHandler}
                        setExerciseActive={setExerciseActive}
                    />
                </div>
                <StatsWindow/>
            </div>
        </div>
    );
};

export default StudyPage;