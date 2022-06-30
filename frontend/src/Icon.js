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
            animationData: require("./13-pizza-flat-edited.json")
        });

        return () => {
            lottie.destroy();
        };
    }, []);

    return (
        <div className="icon">
            <div
                className="animation"
                ref={container}
                onMouseEnter={() => lottie.play()}
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
                    value={50}
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
