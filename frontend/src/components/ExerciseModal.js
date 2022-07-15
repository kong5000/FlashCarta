import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import LoadingPage from './LoadingPage/LoadingPage';
import ExercisePage from './ExercisePage/ExercisePage';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function ExerciseDialog({ updateStats, exerciseActive, setExerciseActive, setActivePage, loading, deck }) {
    const handleClose = () => {
        updateStats()
        setExerciseActive(false);
    };

    return (
        <div>
            <Dialog
                fullScreen
                open={exerciseActive}
                onClose={handleClose}
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
                {loading && <LoadingPage loading={loading} />}
                {!loading && <ExercisePage updateStats={updateStats} deck={deck} setExerciseActive={setExerciseActive} setActivePage={setActivePage} />}
            </Dialog>
        </div>
    );
}
