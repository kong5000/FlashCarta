import { useState, useEffect } from 'react';
import ProgressBar from '../ProgressBar'
import { updateCardRating } from '../../services/api';
import 'firebase/compat/auth';
import firebase from 'firebase/compat/app';
import ExerciseResults from '../ExerciseResults/ExerciseResults'
import ExerciseCard from './ExerciseCard'
import './ExercisePage.css'
const MAX_PRIORITY = 5

const ExercisePage = ({ deck, setExerciseActive, setActivePage }) => {
    const [answerRevealed, setAnswerRevealed] = useState(false)
    const [deckIndex, setDeckIndex] = useState(0)
    const [activeCard, setActiveCard] = useState(deck[deckIndex])
    const [exerciseComplete, setExerciseComplete] = useState(false)
    const [results, setResults] = useState({})

    useEffect(() => {
        let newResults = {}
        console.log(deck)
        if (deck) {
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

    const rateCard = async (rating) => {
        try {
            console.log(rating)
            const idToken = await firebase.auth().currentUser.getIdToken(/* forceRefresh */ true)
            let newResults = { ...results }
            const oldPriority = activeCard.priority

            let newPriority
            if (oldPriority + rating > MAX_PRIORITY) {
                newPriority = MAX_PRIORITY
            } else if (oldPriority + rating < 0) {
                newPriority = 0
            } else {
                newPriority = oldPriority + rating
            }
            newResults[activeCard.word].newPriority = newPriority
            setResults(newResults)
            console.log(newResults)
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


    return (
        <div className="exercise-page">
            {!exerciseComplete && <ProgressBar index={deckIndex} lastIndex={deck.length} style={{color: "red"}} />}
            {!exerciseComplete && <div className='exercise-card'>
                {!answerRevealed && <ExerciseCard word={activeCard} revealAnswer={setAnswerRevealed} rateCard={rateCard} />}
            </div>}
            {exerciseComplete && <ExerciseResults setExerciseActive={setExerciseActive} results={results} setActivePage={setActivePage} />}
        </div>
    )
}

export default ExercisePage