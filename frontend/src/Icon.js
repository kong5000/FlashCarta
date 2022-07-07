import React, { useEffect, useRef } from "react";
import lottie from "lottie-web";
import CircularProgress, {
    circularProgressClasses,
} from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { getDeckByCategory } from './services/api'
import firebase from 'firebase/compat/app';

function Icon(props) {
    const { animation, progress } = props
    let lottieAnimation = null
    switch (animation) {
        case "food":
            lottieAnimation = require("./pizza.json")
            break;
        case "transport":
            lottieAnimation = require("./electric-car.json")
            break;
        case "clothing":
            lottieAnimation = require("./walking-person.json")
            break;
        case "body":
            lottieAnimation = require("./heart.json")
            break;
        case "animals":
            lottieAnimation = require("./turkey.json")
            break;
        case "blue-book":
            lottieAnimation = require("./blue-book.json")
            break;
        case "red-book":
            lottieAnimation = require("./red-book.json")
            break;
        case "brown-book":
            lottieAnimation = require("./brown-book.json")
            break;
        case "black-book":
            lottieAnimation = require("./black-book.json")
            break;
        default:
            lottieAnimation = require("./lock.json")
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
            lottie.destroy();
        };
    }, [animation]);

    const handleClick = async () => {
        const idToken = await firebase.auth().currentUser.getIdToken(/* forceRefresh */ true)

        const deck = await getDeckByCategory( idToken,'pt', animation)
        console.log(deck)
    }

    return (
        <div className="icon" onClick={handleClick}>
            <div
                className="animation"
                ref={container}
                onMouseEnter={() => lottie.play(animation)}
                onMouseLeave={() => lottie.stop()}
            />
            <div className="circle">
            </div>
            <Box sx={{
                position: 'relative',
                top: -227,
                left: -17,
                zIndex: -2,
            }}>
                <CircularProgress
                    variant="determinate"
                    sx={{
                        position: 'absolute',
                        color: (theme) =>
                            theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
                    }}
                    size={145}
                    thickness={3.5}
                    value={100}
                />
                <CircularProgress
                    variant="determinate"
                    value={progress}
                    disableShrink
                    sx={{
                        color: (theme) => (theme.palette.mode === 'light' ? '#ffd700' : '#ffd700'),
                        animationDuration: '550ms',
                        position: 'absolute',
                        left: 0,
                        [`& .${circularProgressClasses.circle}`]: {
                            strokeLinecap: 'round',
                        },
                    }}
                    size={145}
                    thickness={3.5}
                />
            </Box>
        </div>
    );
}

export default Icon;
