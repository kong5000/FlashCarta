import React, { useEffect, useRef } from "react";
import lottie from "lottie-web";

function NavbarButton(props) {
    const { animation, onClick, category } = props
    let lottieAnimation = null
    switch (animation) {
        case "edit":
            lottieAnimation = require("./animations/pencil.json")
            break;
        case "shop":
            lottieAnimation = require("./animations/basket.json")
            break;
        default:
            lottieAnimation = require("./animations/pencil.json")
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

    return (
        <div className="navbar-button"
            onMouseEnter={() => lottie.play(animation)}
            onMouseLeave={() => lottie.stop()
            }>
            <div
                className="navbar-button-icon animation"
                ref={container}
                onClick={() => onClick(category)}
            />
            <div className="navbar-button-label">{category}</div>
        </div>
    );
}

export default NavbarButton;
