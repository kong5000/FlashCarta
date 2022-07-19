import Spinner from "../Spinner/Spinner"
import './LoadingPage.css'
import Typography from '@mui/material/Typography';
const UnderConstructionPage = ({ loading }) => {
    return (
        <div className="loading-page">
            <Spinner loading={loading} alternateAnimation={true} />
            <Typography variant="h5" >
                Sorry! The stats page is still under construction!
            </Typography>
        </div>
    )
}

export default UnderConstructionPage