import React, { useEffect, useRef } from "react";
import lottie from "lottie-web";

function Spinner({alternateAnimation}) {
    let lottieAnimation = require("./animations/pencil-spinner.json")
    if(alternateAnimation){
        lottieAnimation = require("./animations/wrench.json")
    }
    const container = useRef(null);
    useEffect(() => {
        lottie.loadAnimation({
            name: 'spinner',
            container: container.current,
            renderer: "svg",
            loop: true,
            autoplay: false,
            animationData: lottieAnimation
        });
        //setting lottie autoplay true does not seem to work, this interval is a workaround
        let intervalId = setInterval(function() {
            lottie.play('spinner')
          }, 300);

        return () => {
            lottie.destroy('spinner');
            clearInterval(intervalId)
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
