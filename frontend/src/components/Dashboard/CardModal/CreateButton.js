import React, { useEffect, useRef } from "react";
import lottie from "lottie-web";
import './CreateButton.css'
function CreateButton({ setNewCardActive }) {
    let lottieAnimation = require("./pencil.json")

    const container = useRef(null);
    useEffect(() => {
        lottie.loadAnimation({
            name: 'create',
            container: container.current,
            renderer: "svg",
            loop: true,
            autoplay: false,
            animationData: lottieAnimation
        });

        return () => {
            lottie.destroy('create');
        };
    }, []);

    return (
        <div className="create-button-container">
            <div
                className="animation create-icon"
                ref={container}
                onMouseEnter={() => lottie.play('create')}
                onMouseLeave={() => lottie.stop()}
                onClick={() => {
                    setNewCardActive('true')
                }}
            />
            <div>
                Make Card
            </div>
        </div>

    );
}

export default CreateButton;
