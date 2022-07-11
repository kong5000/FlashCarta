import React, { useEffect, useRef } from "react";
import lottie from "lottie-web";

function Spinner() {
    let lottieAnimation = require("./animations/pencil-spinner.json")

    const container = useRef(null);
    useEffect(() => {
        lottie.loadAnimation({
            name: 'spinner',
            container: container.current,
            renderer: "svg",
            loop: true,
            autoplay: true,
            animationData: lottieAnimation
        });
        return () => {
            lottie.destroy('spinner');
        };
    }, []);

    return (
        <div
            className="animation spinner"
            ref={container}
        />

    );
}

export default Spinner;
