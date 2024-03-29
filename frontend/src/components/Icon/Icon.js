import React, { useEffect, useRef, useState } from "react";
import lottie from "lottie-web";
import CircularProgress, {
    circularProgressClasses,
} from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import './Icon.css'
function Icon(props) {
    const [progress, setProgress] = useState(null)
    const { animation, userStats, onClick, category, label } = props
    let lottieAnimation = null
    switch (animation) {
        case "food":
            lottieAnimation = require("./animations/pizza.json")
            break;
        case "transport":
            lottieAnimation = require("./animations/electric-car.json")
            break;
        case "clothing":
            lottieAnimation = require("./animations/walking-person.json")
            break;
        case "body":
            lottieAnimation = require("./animations/heart.json")
            break;
        case "animals":
            lottieAnimation = require("./animations/turkey.json")
            break;
        case "blue-book":
            lottieAnimation = require("./animations/blue-book.json")
            break;
        case "red-book":
            lottieAnimation = require("./animations/red-book.json")
            break;
        case "brown-book":
            lottieAnimation = require("./animations/brown-book.json")
            break;
        case "black-book":
            lottieAnimation = require("./animations/black-book.json")
            break;
        case "notes":
            lottieAnimation = require("./animations/notes.json")
            break;
        default:
            lottieAnimation = require("./animations/lock.json")
    }

    const container = useRef(null);

    useEffect(() => {
        lottie.loadAnimation({
            name: animation,
            container: container.current,
            renderer: "svg",
            loop: true,
            autoplay: false,
            animationData: lottieAnimation
        });

        return () => {
            lottie.destroy(animation);
        };
    }, [lottieAnimation, animation]);

    useEffect(() => {
        if(userStats && userStats[category]){
            if(userStats[category].totalStars > 0){
                setProgress(100 * userStats[category].userStars/ userStats[category].totalStars)
            }
        }
    },[userStats, category])

    return (
        <div className="icon clickable">
            <div
                className="animation"
                ref={container}
                onMouseEnter={() => lottie.play(animation)}
                onMouseLeave={() => lottie.stop()}
                onClick={() => {
                    onClick(category)
                }}
            />
            <div className="circle">
            </div>
            <Box sx={{
                position: 'relative',
                top: -205,
                left: -64,
                zIndex: -2,
            }}>
                <CircularProgress
                    variant="determinate"
                    sx={{
                        position: 'absolute',
                        color: (theme) =>
                            theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
                    }}
                    size={130}
                    thickness={3.5}
                    value={100}
                />
                <CircularProgress
                    variant="determinate"
                    value={progress}
                    sx={{
                        color: (theme) => (theme.palette.mode === 'light' ? '#ffd700' : '#ffd700'),
                        animationDuration: '550ms',
                        position: 'absolute',
                        [`& .${circularProgressClasses.circle}`]: {
                            strokeLinecap: 'round',
                        },
                    }}
                    size={130}
                    thickness={3.5}
                />
            </Box>
            <div className="icon-label">{label}</div>
        </div>
    );
}

export default Icon;
