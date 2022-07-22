import React from 'react';
import Categories from './Categories';
import './StudyPage.css'
import Icon from '../../Icon/Icon';
import CreateButton from '../../Dashboard/CardModal/CreateButton';

const StudyPage = ({ setExerciseActive, categoryClickHandler, setNewCardActive, userStats }) => {
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
            </div>
        </div>
    );
};

export default StudyPage;