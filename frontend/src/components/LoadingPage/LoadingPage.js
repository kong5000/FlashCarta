import Spinner from "../Spinner/Spinner"
import './LoadingPage.css'

const LoadingPage = () => {
    return (
        <div className="loading-page">
            <Spinner />
            <div className="loading-text">Your exercise is loading</div>
        </div>
    )
}

export default LoadingPage