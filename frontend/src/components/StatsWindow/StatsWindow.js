import React from 'react';
import CardRating from '../CardRating';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
function StatsWindow(props) {
    return (
        <div className='study-page-container'>
            <Typography className='exercise-word' variant="h5" >
                Word Mastery
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs={4}>
                    Mastered: 10
                </Grid>
                <Grid item xs={8}>
                    <CardRating rating={5} />
                </Grid>
            </Grid>
            <Grid container spacing={2}>
                <Grid item xs={4}>
                    Easy: 5
                </Grid>
                <Grid item xs={8}>
                    <CardRating rating={4} />
                </Grid>
            </Grid>
            <Grid container spacing={2}>
                <Grid item xs={4}>
                    Medium Words: 10
                </Grid>
                <Grid item xs={8}>
                    <CardRating rating={3} />
                </Grid>
            </Grid>
            <Grid container spacing={2}>
                <Grid item xs={4}>
                    Difficult Words: 10
                </Grid>
                <Grid item xs={8}>
                    <CardRating rating={2} />
                </Grid>
            </Grid>
            <Grid container spacing={2}>
                <Grid item xs={4}>
                    New Words: 10
                </Grid>
                <Grid item xs={8}>
                    <CardRating rating={1} />
                </Grid>
            </Grid>
            {/* <CardRating rating={5} />
            <CardRating rating={4} />
            <CardRating rating={3} />
            <CardRating rating={2} />
            <CardRating rating={1} /> */}
        </div>
    );
}

export default StatsWindow;