import Spinner from "./Spinner/Spinner"
import Typography from '@mui/material/Typography';
const LockedPage = ({ loading, locked }) => {
    return (
        <div className="loading-page">
            <Spinner loading={loading} locked={locked} />
            <Typography variant="h5" >
                Get a free subscription in the SHOP page for access to settings
            </Typography>
        </div>
    )
}

export default LockedPage