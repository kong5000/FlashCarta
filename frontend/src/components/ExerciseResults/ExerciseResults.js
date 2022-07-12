import React, { useEffect, useRef } from "react";
import lottie from "lottie-web";
import { Button } from "@mui/material";
import CardRating from "../CardRating";
import './ExerciseResults.css'
function ExerciseResults({ setExerciseActive, results }) {
    let lottieAnimation = require("./celebration.json")

    const container = useRef(null);
    useEffect(() => {
        lottie.loadAnimation({
            name: 'celebration',
            container: container.current,
            renderer: "svg",
            loop: false,
            autoplay: true,
            animationData: lottieAnimation
        });
        return () => {
            lottie.destroy('celebration');
        };
    }, []);

    useEffect(() => {
        console.log(results)
    },[])

    const calculateResults = (results) => {
        let totalStars = 0
        Object.keys(results).forEach(key => {
            if(results[key].newPriority - results[key].oldPriority > 0){
                totalStars += results[key].newPriority - results[key].oldPriority
            }
        })
        if(totalStars < 0){
            totalStars = 0
        }
        return totalStars
    }

    return (
        <div className="exercise-results">
            <div>Exercise Complete!</div>
            <div
                className="animation spinner"
                ref={container}
            />
            You improved on {calculateResults(results)} words
            {Object.keys(results).map(key => {
                return (
                    <div>
                        <CardRating label={key} rating={results[key].newPriority}/>
                    </div>
                )
            })}
            <Button onClick={() => {
                setExerciseActive(false)
            }}>Next</Button>
        </div>

    );
}

export default ExerciseResults;
