import Spinner from "../Spinner/Spinner"
import './LoadingPage.css'

const LoadingPage = ({loading}) => {
    return (
        <div className="loading-page">
            <Spinner loading={loading}/>
            <div className="loading-text">Your exercise is loading</div>
        </div>
    )
}

export default LoadingPage