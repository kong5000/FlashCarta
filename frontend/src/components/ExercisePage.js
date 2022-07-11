import { useState, useRef } from 'react';
import ProgressBar from './ProgressBar'

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
        if (e.key === " " || e.key === "Enter") return //Space and enter seem to convert to numbers, reject them explicitly
        console.log(e.key)
        if (Number.isInteger(Number(e.key)) && Number(e.key) <= 3) {
            rateCard(e.key)
        }
    }

    const rateCard = (rating) => {
        if (answerRevealed) {
            setAnswerRevealed(false)
            setActiveCard(deck[deckIndex + 1])
            setDeckIndex(deckIndex + 1)
            alert(`you rated ${rating}`)
        }
        setAnswerRevealed(false)
        //Transition to next card
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
            <div className='exercise-button-container'>
                <button onClick={() => rateCard(1)}>1</button>
                <button onClick={() => rateCard(2)}>2</button>
                <button onClick={() => rateCard(3)}>3</button>
            </div>
        </div>
    )
}

export default ExercisePage