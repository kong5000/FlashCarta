import React, { useEffect, useRef } from "react";
import lottie from "lottie-web";
import CircularProgress, {
    circularProgressClasses,
} from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

function Icon() {
    const container = useRef(null);

    useEffect(() => {
        lottie.loadAnimation({
            container: container.current,
            renderer: "svg",
            loop: true,
            autoplay: false,
            animationData: require("./13-pizza-outline-edited.json")
        });

        return () => {
            lottie.destroy();
        };
    }, []);

    return (
        <div className="icon">
            <h1>React Lottie Demo</h1>
            <div
                className="animation"
                ref={container}
                onMouseEnter={() => lottie.play()}
                onMouseLeave={() => lottie.stop()}
            />

            <Box sx={{ position: 'relative' }}>
                <CircularProgress
                    variant="determinate"
                    sx={{
                        color: (theme) =>
                            theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
                    }}
                    size={100}
                    thickness={4}
                    value={100}
                />
                <CircularProgress
                    variant="determinate"
                    value={50}
                    disableShrink
                    sx={{
                        color: (theme) => (theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8'),
                        animationDuration: '550ms',
                        position: 'absolute',
                        left: 0,
                        [`& .${circularProgressClasses.circle}`]: {
                            strokeLinecap: 'round',
                        },
                    }}
                    size={100}
                    thickness={4}
                />
            </Box>
        </div>
    );
}

export default Icon;
