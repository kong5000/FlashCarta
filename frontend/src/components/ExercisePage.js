import { useState, useRef } from 'react';
import ProgressBar from './ProgressBar'
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { updateCardRating } from '../services/api';
import 'firebase/compat/auth';
import firebase from 'firebase/compat/app';

const ExercisePage = ({ deck }) => {
    const [answerRevealed, setAnswerRevealed] = useState(false)
    const [deckIndex, setDeckIndex] = useState(0)
    const [activeCard, setActiveCard] = useState(deck[deckIndex])
    const useFocus = () => {
        const htmlElRef = useRef(null)
        const setFocus = () => { htmlElRef.current && htmlElRef.current.focus() }

        return [htmlElRef, setFocus]
    }

    const [inputRef, setInputFocus] = useFocus()

    const handleKeyDown = (e) => {
        console.log(e)
        if (e.key === " " || e.key === "Enter") setAnswerRevealed(true)
        else if (Number.isInteger(Number(e.key)) && Number(e.key) <= 3) {
            rateCard(convertKeyPressToRating(e.key))
        }
    }
    const convertKeyPressToRating = (key) =>{
        return  parseInt(key) - 2
    }

    const rateCard = async (rating) => {
        if (answerRevealed) {
            try{
                const idToken = await firebase.auth().currentUser.getIdToken(/* forceRefresh */ true)
                updateCardRating(idToken, activeCard, rating)
            }catch(err){
                console.log(err)
                alert('Sorry, there was an error on our end, your progress was not recorded')
            }

            setAnswerRevealed(false)
            setActiveCard(deck[deckIndex + 1])
            setDeckIndex(deckIndex + 1)
        }
        setAnswerRevealed(false)
    }


    return (
        <div className="exercise-page" onKeyDown={handleKeyDown} tabIndex="0" ref={inputRef}>
            {activeCard.word}
            {answerRevealed && activeCard.definition}
            {deckIndex}
            <ProgressBar />
            {!answerRevealed && <button onClick={() => {
                setAnswerRevealed(true)
                setInputFocus(inputRef)
            }}>Reveal</button>}
            {answerRevealed &&
                <div className='exercise-button-container'>
                    <Stack spacing={2} direction="row">
                        <Button variant="contained" onClick={() => rateCard(-1)}>1</Button>
                        <Button variant="contained" onClick={() => rateCard(0)}>2</Button>
                        <Button variant="contained" onClick={() => rateCard(1)}>3</Button>
                    </Stack>
                </div>}
        </div>
    )
}

export default ExercisePage