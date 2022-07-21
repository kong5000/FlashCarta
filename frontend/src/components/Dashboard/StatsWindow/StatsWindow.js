import React, { useEffect } from 'react';
import CardRating from '../../ExercisePage/CardRating';
import Typography from '@mui/material/Typography';
import './StatsWindow.css'
function StatsWindow({ userStats }) {
    useEffect(() => {
        console.log(userStats)
    }, [userStats])
    return (
        <div className='study-page-container'>
            <Typography className='stats-title' variant="h5" style={{ marginBottom: '20px' }}>
                Your Words
            </Typography>
            <div className='stats-window'>
                <div className='flex-column'>
                    <div className='stat-header'>
                        Level
                    </div>
                    <div>
                        Mastered
                    </div>
                    <div>
                        Easy
                    </div>
                    <div>
                        Medium
                    </div>
                    <div>
                        Difficult
                    </div>
                    <div>
                        New
                    </div>
                </div>
                <div className='flex-column'>
                    <div className='stat-header'>
                        #
                    </div>
                    <div>
                        {userStats && userStats.starRatings[5]}
                    </div>
                    <div>
                        {userStats && userStats.starRatings[4]}
                    </div>
                    <div>
                        {userStats && userStats.starRatings[3]}
                    </div>
                    <div>
                        {userStats && userStats.starRatings[2]}
                    </div>
                    <div>
                        {userStats && userStats.starRatings[1]}
                    </div>
                </div>
                <div className='flex-column'>
                    <div className='stat-header'>
                        Rating
                    </div>
                    <CardRating rating={5} />
                    <CardRating rating={4} />
                    <CardRating rating={3} />
                    <CardRating rating={2} />
                    <CardRating rating={1} />
                </div>
            </div>
        </div>
    );
}

export default StatsWindow;