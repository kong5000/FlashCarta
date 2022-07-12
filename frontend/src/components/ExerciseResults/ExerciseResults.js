import React, { useEffect, useRef } from "react";
import lottie from "lottie-web";
import { Button } from "@mui/material";

function ExerciseResults({results}) {
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

    return (
        <div className="exercise-results">
            <div>Exercise Complete!</div>
            <div
                className="animation spinner"
                ref={container}
            />
            <div>{results.good}</div>
            <div>{results.neutral}</div>
            <div>{results.bad}</div>
            <Button>Next</Button>
        </div>

    );
}

export default ExerciseResults;
