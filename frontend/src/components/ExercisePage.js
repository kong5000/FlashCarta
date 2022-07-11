import { useEffect, useState } from 'react';
import ProgressBar from './ProgressBar'

const ExercisePage = ({ deck }) => {
    const [answerRevealed, setAnswerRevealed] = useState(false)
    const [deckIndex, setDeckIndex] = useState(0)
    const [activeCard, setActiveCard] = useState(deck[deckIndex])

    const handleKeyDown = (e) => {

        if (e.key === " " || e.key === "Enter") return //Space and enter seem to convert to numbers, reject them explicitly
        console.log(e.key)
        if (Number.isInteger(Number(e.key)) && Number(e.key) <= 3) {
        }


    }

    const rateCard = () => {

        setAnswerRevealed(false)
        //Transition to next card
    }

    return (
        <div className="exercise-page" onKeyDown={handleKeyDown}>
            {activeCard.word}
            <ProgressBar />
            <div className="loading-text">CONTEdddNT</div>
        </div>
    )
}

export default ExercisePage