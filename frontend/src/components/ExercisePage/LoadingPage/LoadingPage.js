import Spinner from "../../Spinner/Spinner"
import './LoadingPage.css'
import Typography from '@mui/material/Typography';
const LoadingPage = ({ loading }) => {
    return (
        <div className="loading-page">
            <Spinner loading={loading}  alternateAnimation={true}/>
            <Typography variant="h5" >
                Your exercise is loading
            </Typography>
        </div>
    )
}

export default LoadingPage