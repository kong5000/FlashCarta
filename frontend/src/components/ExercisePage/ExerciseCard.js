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
    const useFocus = () => {
        const htmlElRef = useRef(null)
        const setFocus = () => { htmlElRef.current && htmlElRef.current.focus() }

        return [htmlElRef, setFocus]
    }

    const [inputRef, setInputFocus] = useFocus()

    const handleKeyDown = (e) => {
        if (e.key === " " || e.key === "Enter") setAnswerRevealed(true)
        else if (Number.isInteger(Number(e.key)) && Number(e.key) <= 3) {
            userInputHandler(convertKeyPressToRating(e.key))
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
        <Card sx={{ minWidth: 450, marginTop: '30px' }} onKeyDown={handleKeyDown} tabIndex="0" ref={inputRef}>
            <CardContent>
                <div className='exercise-card'>
                    <Typography variant="h5" >
                        {word.word}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        {word.type}
                    </Typography>
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
                        <Typography variant="h5" component="div" gutterBottom>
                            {word.definition}
                        </Typography>
                        :
                        <Skeleton variant="text" width={70} height={40} animation={false} />
                    }

                    {answerRevealed ?
                        <div className='exercise-button-container'>
                            <Stack spacing={2} direction="row">
                                <Button variant="contained" onClick={() => userInputHandler(-1)}>1</Button>
                                <Button variant="contained" onClick={() => userInputHandler(1)}>2</Button>
                                <Button variant="contained" onClick={() => userInputHandler(2)}>3</Button>
                            </Stack>
                        </div>
                        :
                        <CardActions>
                            <Button size="small" onClick={() => setAnswerRevealed(true)}>Reveal</Button>
                        </CardActions>
                    }
                </div>
            </CardContent>
        </Card >
    );
}
