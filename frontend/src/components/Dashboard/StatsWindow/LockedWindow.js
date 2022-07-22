import React from 'react';
import LockIcon from './LockIcon'
function LockedWindow(props) {
    return (
        <div className='study-page-container'>
            <h2>
                Word Ratings
            </h2>
            <div className='stats-window'>
                <LockIcon />
                <div>
                    Unlock this feature in the shop
                </div>
            </div>

        </div>
    );
}

export default LockedWindow;