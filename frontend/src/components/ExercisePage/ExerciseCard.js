import React, { useState, useRef, useEffect } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import ReactAudioPlayer from 'react-audio-player';

import './ExerciseCard.css'
const bull = (
    <Box
        component="span"
        sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
        •
    </Box>
);

export default function BasicCard({ word, rateCard }) {
    const [answerRevealed, setAnswerRevealed] = useState(false)
    const [showPlayer, setShowPlayer] = useState(true)
    
    //Set focus to the ExerciseCard to handle keyboard inputs immediately
    const useFocus = () => {
        const htmlElRef = useRef(null)
        const setFocus = () => { htmlElRef.current && htmlElRef.current.focus() }

        return [htmlElRef, setFocus]
    }

    const [inputRef, setInputFocus] = useFocus()

    useEffect(() => {
        setInputFocus()
      }, []);

    const handleKeyDown = (e) => {
        if (e.key === " " || e.key === "Enter") setAnswerRevealed(true)
        else if (Number.isInteger(Number(e.key)) && Number(e.key) <= 3) {
            if (answerRevealed) { userInputHandler(convertKeyPressToRating(e.key)) }
        }
    }

    const convertKeyPressToRating = (key) => {
        switch (parseInt(key)) {
            case 1:
                return -1
            case 2:
                return 1
            case 3:
                return 2
            default:
                return 0
        }
    }
    const onAudioPlayerError = (err) => {
        console.log(err)
        setShowPlayer(false)
    }

    const userInputHandler = (rating) => {
        rateCard(rating)
        setAnswerRevealed(false)
    }

    const onAudioCanPlay = () => {
        setShowPlayer(true)
    }

    return (
        <div className='exercise-card' sx={{ minWidth: 450, marginTop: '30px' }} onKeyDown={handleKeyDown} tabIndex="0" ref={inputRef}>
            <CardContent>
                <div className='exercise-word'>
                    <Typography className='exercise-word' variant="h4" >
                        {word.word}
                    </Typography></div>
                {/* <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    {word.type}
                </Typography> */}
                {showPlayer &&
                    <div className="audio-player">
                        <ReactAudioPlayer
                            src={word.audio}
                            autoPlay
                            controls
                            onCanPlay={onAudioCanPlay}
                            onError={onAudioPlayerError} />
                    </div>}
                {answerRevealed ?
                    <div className='answer-text'>
                        <Typography variant="h4" component="div" gutterBottom>
                            {word.definition}
                        </Typography>
                    </div>
                    :
                    <div></div>
                }
                <div className='exercise-button-container'>
                    {answerRevealed ?
                        <div>
                            <div className='gradient-bar-container'>
                                Hard
                                <div className='gradient-bar'></div>
                                Easy
                            </div>
                            <div className='button-group'>
                                <Button size="small" variant="contained" onClick={() => userInputHandler(-1)}>1</Button>
                                <Button size="small" variant="contained" onClick={() => userInputHandler(1)}>2</Button>
                                <Button variant="contained" onClick={() => userInputHandler(2)}>3</Button>
                            </div>
                        </div>
                        : <Button variant="contained" onClick={() => setAnswerRevealed(true)}>Reveal</Button>
                    }
                </div>







            </CardContent>
        </div >
    );
}
