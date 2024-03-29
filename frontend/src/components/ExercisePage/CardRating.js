import Rating from '@mui/material/Rating';

const CardRating = ({ label, rating }) => {
    {
        return (<div className='card-rating'>
            <div className='card-rating-label'>{label}</div>
            <Rating size="medium" name="read-only" value={rating} readOnly />
        </div>)
    }
}
export default CardRating

