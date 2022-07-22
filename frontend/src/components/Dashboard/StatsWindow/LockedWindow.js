import React from 'react';
import LockIcon from './LockIcon'
function LockedWindow(props) {
    return (
        <div className='stats-page'>
        <div className='locked-window-container'>
            <h2>
                Word Ratings
            </h2>
            <LockIcon />
            <div>
                Unlock this feature in the shop
            </div>
        </div>
        </div>
    );
}

export default LockedWindow;