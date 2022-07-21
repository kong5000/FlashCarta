import React, { useEffect, useRef, useState } from "react";
import lottie from "lottie-web";
import './LockIcon.css'

function Icon() {
    let lottieAnimation = require("./lock.json")

    const container = useRef(null);
    useEffect(() => {
        lottie.loadAnimation({
            name: 'lock-icon',
            container: container.current,
            renderer: "svg",
            loop: true,
            autoplay: false,
            animationData: lottieAnimation
        });

        return () => {
            lottie.destroy('lock-icon');
        };
    }, []);

    return (
        <div className="icon">
            <div
                className="animation"
                ref={container}
                onMouseEnter={() => lottie.play('lock-icon')}
                onMouseLeave={() => lottie.stop()}
                onClick={() => {
                }}
            />
        </div>
    );
}

export default Icon;
