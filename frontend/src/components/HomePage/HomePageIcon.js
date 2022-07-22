import React, { useEffect, useRef } from "react";
import lottie from "lottie-web";

function Spinner({ animation }) {
    let lottieAnimation = null
    switch (animation) {
        case "pencil":
            lottieAnimation = require("./animations/pencil-spinner.json")
            break;
        default:
            lottieAnimation = require("./animations/notes.json")

    }
    const container = useRef(null);
    useEffect(() => {
        let animation = lottie.loadAnimation({
            name: 'spinner',
            container: container.current,
            renderer: "svg",
            loop: false,
            autoplay: false,
            animationData: lottieAnimation
        });

        animation.goToAndPlay(0)

        //setting lottie autoplay true does not seem to work, this interval is a workaround
        animation.addEventListener('complete', function () {
            setTimeout(function () {
                animation.goToAndPlay(0);
            }, 3000);
        }, [lottieAnimation])

        return () => {
            lottie.destroy('spinner');
        };
    }, [lottieAnimation]);

    return (
        <div
            className="animation spinner"
            ref={container}
        />

    );
}

export default Spinner;
