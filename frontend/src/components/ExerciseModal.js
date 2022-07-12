import React from 'react';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import LoadingPage from './LoadingPage/LoadingPage';
import ExercisePage from './ExercisePage';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function ExerciseDialog({ exerciseActive, setExerciseActive, loading, deck }) {
    const handleClose = () => {
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
                <AppBar sx={{ position: 'relative' }}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={handleClose}
                            aria-label="close"
                        >
                            <CloseIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>
                {loading && <LoadingPage loading={loading} />}
                {!loading && <ExercisePage deck={deck} setExerciseActive={setExerciseActive}/>}
            </Dialog>
        </div>
    );
}
