import React, { useEffect, useRef } from "react";
import lottie from "lottie-web";
import { Button } from "@mui/material";
import CardRating from "../CardRating";
import Typography from '@mui/material/Typography';

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
    }, [])

    const calculateResults = (results) => {
        let totalStars = 0
        Object.keys(results).forEach(key => {
            if (results[key].newPriority - results[key].oldPriority > 0) {
                totalStars += results[key].newPriority - results[key].oldPriority
            }
        })
        if (totalStars < 0) {
            totalStars = 0
        }
        return totalStars
    }

    return (
        <div className="exercise-results">
            <Typography variant="h4" >
                Exercise Complete!
            </Typography>
            <div
                className="animation spinner"
                ref={container}
            />
            <div className="finish-button">
                <Button variant="contained" size='large' onClick={() => {
                    setExerciseActive(false)
                }}>Finish</Button>
            </div>
            <Typography variant="h5" >
                Results
            </Typography>
            <div className="results-table">
                {Object.keys(results).map(key =>
                    <CardRating label={key} rating={results[key].newPriority} />
                )}
            </div>
        </div>

    );
}

export default ExerciseResults;
