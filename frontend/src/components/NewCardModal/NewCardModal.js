import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Checkbox } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';
import './NewCardModal.css'
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function ExerciseDialog({ updateStats, exerciseActive, setExerciseActive, setActivePage, loading, deck }) {
    const handleClose = () => {
        updateStats()
        setExerciseActive(false);
    };
    const [generateAudio, setGenerateAudio] = useState(true)
    const [foreignWord, setForeignWord] = useState('')
    const [definition, setDefinition] = useState('')

    return (
        <div>
            <Dialog
                fullScreen
                open={true}
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
                    <Button>Create</Button>
                </div>
            </Dialog>
        </div>
    );
}
