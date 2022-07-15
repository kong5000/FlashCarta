import React from 'react';
import CardRating from '../CardRating';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
function StatsWindow(props) {
    return (
        <div className='study-page-container'>
            <div className='stats-window'>
                <Typography className='stats-title' variant="h5"  style={{marginBottom: '20px'}}>
                    Your Words
                </Typography>
                <Grid container spacing={1}>
                    <Grid item xs={4}>
                        <Typography className='exercise-word' variant="h6" >
                            Level
                        </Typography>
                    </Grid>
                    <Grid item xs={2}>
                        <Typography className='exercise-word' variant="h6" >
                            Count
                        </Typography>
                    </Grid>
                    <Grid item xs={4}>
                    <Typography className='exercise-word' variant="h6" >
                            Rating
                        </Typography>
                    </Grid>
                </Grid>
                <Grid container spacing={1}>
                    <Grid item xs={4}>
                        Mastered
                    </Grid>
                    <Grid item xs={2}>
                        10
                    </Grid>
                    <Grid item xs={4}>
                        <CardRating rating={5} />
                    </Grid>
                </Grid>
                <Grid container spacing={1}>
                    <Grid item xs={4}>
                        Easy
                    </Grid>
                    <Grid item xs={2}>
                        10
                    </Grid>
                    <Grid item xs={4}>
                        <CardRating rating={4} />
                    </Grid>
                </Grid>
                <Grid container spacing={1}>
                    <Grid item xs={4}>
                        Medium
                    </Grid>
                    <Grid item xs={2}>
                        10
                    </Grid>
                    <Grid item xs={4}>
                        <CardRating rating={3} />
                    </Grid>
                </Grid>
                <Grid container spacing={1}>
                    <Grid item xs={4}>
                        Difficult
                    </Grid>
                    <Grid item xs={2}>
                        10
                    </Grid>
                    <Grid item xs={4}>
                        <CardRating rating={2} />
                    </Grid>
                </Grid>
                <Grid container spacing={1}>
                    <Grid item xs={4}>
                        New
                    </Grid>
                    <Grid item xs={2}>
                        10
                    </Grid>
                    <Grid item xs={4}>
                        <CardRating rating={1} />
                    </Grid>
                </Grid>
                {/* <CardRating rating={5} />
            <CardRating rating={4} />
            <CardRating rating={3} />
            <CardRating rating={2} />
            <CardRating rating={1} /> */}
            </div>
        </div>
    );
}

export default StatsWindow;