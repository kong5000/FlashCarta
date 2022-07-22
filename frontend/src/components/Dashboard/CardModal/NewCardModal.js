import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import TextField from '@mui/material/TextField';
import { Checkbox } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { createCustomCard } from '../../../services/api'
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore'
import 'firebase/compat/auth';
import './NewCardModal.css'

const DEFAULT_ERROR_MESSAGE = 'Sorry, there was an error when adding your card. Please try again later.'

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function NewCardDialog({ newCardActive, setNewCardActive }) {
    const handleClose = () => {
        
        console.log("CLOSE")
        setNewCardActive(false);
    };
    const [generateAudio, setGenerateAudio] = useState(true)
    const [foreignWord, setForeignWord] = useState('')
    const [definition, setDefinition] = useState('')
    const [waiting, setWaiting] = useState(false)
    const [open, setOpen] = useState(false);
    const [errorOpen, setErrorOpen] = useState(false)
    const [errorMessage, setErrorMessage] = useState(DEFAULT_ERROR_MESSAGE)

    const handleClick = async () => {
        try{
            if(!definition || !foreignWord){
                setErrorMessage('New Word and Definition inputs are required')
                setErrorOpen(true)
                return
            }
            if(foreignWord.length > 30){
                setErrorMessage('Sorry, the max word length is 30')
                setErrorOpen(true)
                return
            }

            setWaiting(true)
            let newCard = {
                word: foreignWord,
                definition,
                generateAudio,
                language: 'pt'
            }
            const idToken = await firebase.auth().currentUser.getIdToken(/* forceRefresh */ true)
            await createCustomCard(idToken, newCard)
            setWaiting(false)
            setOpen(true)
            setForeignWord('')
            setDefinition('')
        }catch(err){
            setErrorMessage(DEFAULT_ERROR_MESSAGE)
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
        <div>
            <Dialog
                fullScreen
                open={newCardActive}
                onClose={() => { }}
                TransitionComponent={Transition}
            >
                <AppBar sx={{ position: 'relative', border: 'none', backgroundColor: 'white', boxShadow: 'none' }}>
                    <Toolbar sx={{ color: 'gray', marginLeft: '20px' }}>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={handleClose}
                            aria-label="close"
                        >
                            <CloseIcon fontSize='large' />
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <div className='new-word-form'>
                    <TextField className='form-text-input'
                        label={"New Word"}
                        variant="standard"
                        value={foreignWord}
                        onChange={(event) => {
                            setForeignWord(event.target.value)
                        }} />
                    <TextField className='form-text-input' label="Definition" variant="standard" value={definition} onChange={(event) => {
                        setDefinition(event.target.value)
                    }} />
                    <TextField
                        className='form-text-input'
                        disabled
                        id="standard-disabled"
                        label="Language"
                        defaultValue="Portuguese"
                        variant="standard"
                    />
                    <FormControlLabel control={<Checkbox defaultChecked />} label="Generate Audio" />
                    {!waiting && <Button  onClick={handleClick} variant="contained">Create</Button>}
                    {waiting && <CircularProgress />}
                    <Snackbar open={open} autoHideDuration={6000} onClose={handleCloseSnack}>
                        <Alert onClose={handleCloseSnack} severity="success" sx={{ width: '100%' }}>
                            Word added to your deck!
                        </Alert>
                    </Snackbar>
                    <Snackbar open={errorOpen} autoHideDuration={6000} onClose={handleCloseSnack}>
                        <Alert onClose={handleCloseSnack} severity="error" sx={{ width: '100%' }}>
                            {errorMessage}
                        </Alert>
                    </Snackbar>
                </div>
            </Dialog>
        </div>
    );
}
