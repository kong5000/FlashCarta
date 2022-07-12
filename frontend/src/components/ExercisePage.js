import { useState, useRef, useEffect } from 'react';
import ProgressBar from './ProgressBar'
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { updateCardRating } from '../services/api';
import 'firebase/compat/auth';
import firebase from 'firebase/compat/app';
import ExerciseResults from './ExerciseResults/ExerciseResults'
const MAX_PRIORITY = 5

const ExercisePage = ({ deck, setExerciseActive, setActivePage }) => {
    const [answerRevealed, setAnswerRevealed] = useState(false)
    const [deckIndex, setDeckIndex] = useState(0)
    const [activeCard, setActiveCard] = useState(deck[deckIndex])
    const [exerciseComplete, setExerciseComplete] = useState(false)
    const [results, setResults] = useState({})

    useEffect(() => {
        let newResults ={}
        console.log(deck)
        if(deck){
            deck.forEach(card => {
                console.log(card)
                newResults[card.word] = {}
                newResults[card.word]['oldPriority'] = card.priority
                newResults[card.word]['newPriority'] = null
            })
            console.log(newResults)
            setResults(newResults)
        }
    }, [deck])
    const useFocus = () => {
        const htmlElRef = useRef(null)
        const setFocus = () => { htmlElRef.current && htmlElRef.current.focus() }

        return [htmlElRef, setFocus]
    }

    const [inputRef, setInputFocus] = useFocus()

    const handleKeyDown = (e) => {
        if (e.key === " " || e.key === "Enter") setAnswerRevealed(true)
        else if (Number.isInteger(Number(e.key)) && Number(e.key) <= 3) {
            rateCard(convertKeyPressToRating(e.key))
        }
    }
    
    const convertKeyPressToRating = (key) => {
        switch(parseInt(key)){
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
    const getLabelForRating = (rating) => {
        if(rating < 0){
            return 'bad'
        }else if (rating === 0){
            return 'neutral'
        }
        return 'good'
    }

    const rateCard = async (rating) => {
        if (answerRevealed) {
            try {
                const idToken = await firebase.auth().currentUser.getIdToken(/* forceRefresh */ true)
                let newResults = { ...results }
                const oldPriority = activeCard.priority

                let newPriority 
                if(oldPriority + rating > MAX_PRIORITY){
                    newPriority = MAX_PRIORITY
                }else if(oldPriority + rating < 0){
                    newPriority = 0
                }else{
                    newPriority = oldPriority + rating
                }
                newResults[activeCard.word].newPriority = newPriority
                setResults(newResults)
                updateCardRating(idToken, activeCard, rating)
            } catch (err) {
                console.log(err)
                alert('Sorry, there was an error on our end, your progress was not recorded')
            }

            setAnswerRevealed(false)
            if (deckIndex + 1 < deck.length) {
                setActiveCard(deck[deckIndex + 1])
                setDeckIndex(prevDeckIndex => prevDeckIndex + 1)
            } else {
                setExerciseComplete(true)
            }

        }
        setAnswerRevealed(false)
    }


    return (
        <div className="exercise-page" onKeyDown={handleKeyDown} tabIndex="0" ref={inputRef}>
            {results.good}
            {!exerciseComplete && <div>
                {activeCard.word}
                {answerRevealed && activeCard.definition}
                {deckIndex}
                <ProgressBar index={deckIndex} lastIndex={deck.length} />
                {!answerRevealed && <button onClick={() => {
                    setAnswerRevealed(true)
                    setInputFocus(inputRef)
                }}>Reveal</button>}
                {answerRevealed &&
                    <div className='exercise-button-container'>
                        <Stack spacing={2} direction="row">
                            <Button variant="contained" onClick={() => rateCard(-1)}>1</Button>
                            <Button variant="contained" onClick={() => rateCard(1)}>2</Button>
                            <Button variant="contained" onClick={() => rateCard(2)}>3</Button>
                        </Stack>
                    </div>}
            </div>}
            {exerciseComplete && <ExerciseResults setExerciseActive={setExerciseActive} results={results} setActivePage={setActivePage}/>}
        </div>
    )
}

export default ExercisePage