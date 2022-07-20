import React, { useEffect, useRef } from "react";
import lottie from "lottie-web";
import Button from '@mui/material/Button';
import './StorePage.css'
function BuyPremium({ onClick }) {
    let lottieAnimation = require("./coin.json")

    const container = useRef(null);
    useEffect(() => {
        lottie.loadAnimation({
            name: 'subscribe',
            container: container.current,
            renderer: "svg",
            loop: true,
            autoplay: false,
            animationData: lottieAnimation
        });
        return () => {
            lottie.destroy('subscribe');
        };
    }, []);

    return (
        <div
            onClick={onClick} className='buy-premium-button'
            onMouseEnter={() => lottie.play('subscribe')}
            onMouseLeave={() => lottie.stop('subscribe')}>
            <div
                className="coin"
                ref={container}

            />
            <Button>Subscribe</Button>
        </div>
    );
}

export default BuyPremium;
