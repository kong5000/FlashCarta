import React, { useState, useEffect } from 'react';
import Setting from './Setting'
import "./SettingsPage.css"
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore'
import 'firebase/compat/auth';
import CircularProgress from '@mui/material/CircularProgress';
import { updateSettings } from '../../../services/api'

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


const SettingsPage = ({userSettings, updateUserInfo}) => {
    const [cardsPerSession, setCardsPerSession] = useState(null)
    const [waiting, setWaiting] = useState(false)
    const [open, setOpen] = useState(false);
    const [errorOpen, setErrorOpen] = useState(false)

    useEffect(() =>{
        if(userSettings){
            setCardsPerSession(userSettings.cardsPerSession)
        }
    },[userSettings]) 

    const handleClick = async () => {
        try {
            setWaiting(true)

            const idToken = await firebase.auth().currentUser.getIdToken(/* forceRefresh */ true)
            await updateSettings(idToken, { cardsPerSession })
            await updateUserInfo()
            setWaiting(false)
            setOpen(true)
        } catch (err) {
            setWaiting(false)
            setErrorOpen(true)
            console.log(err)
        }

    };

    const handleCloseSnack = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setErrorOpen(false)
        setOpen(false);
    };

    return (
        <div className='settings-page'>
            <div className='settings-container'>
                <Setting cardsPerSession={cardsPerSession} setCardsPerSession={setCardsPerSession} />
            </div>
            {!waiting && <Button onClick={handleClick} variant="contained">Save</Button>}
            {waiting && <CircularProgress />}
            <Snackbar open={open} autoHideDuration={6000} onClose={handleCloseSnack}>
                <Alert onClose={handleCloseSnack} severity="success" sx={{ width: '100%' }}>
                    Settings Updated!
                </Alert>
            </Snackbar>
            <Snackbar open={errorOpen} autoHideDuration={6000} onClose={handleCloseSnack}>
                <Alert onClose={handleCloseSnack} severity="error" sx={{ width: '100%' }}>
                    Sorry, there was an error when saving your settings. Please try again later.
                </Alert>
            </Snackbar>
        </div>
    );
};

export default SettingsPage;