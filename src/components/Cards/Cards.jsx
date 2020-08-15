import React, { useState } from 'react';
import { Card, CardContent, Typography, Grid} from "@material-ui/core";

import style from './Cards.module.css'


function Cards(props) {
    console.log(props)

 return (
  <div className={style.container}>
    <Grid container spacing={3} justify='center'>
        <Grid item component={Card}>
            <CardContent>
                <Typography color='textSecondary ' gutterBottom>Infected</Typography>
                <Typography variant='h5'>Real Data</Typography>
                <Typography color="textSecondary"> real date</Typography>
                <Typography variant='body2'>Number of active cases of COVID-19</Typography>
            </CardContent>
        </Grid>
        <Grid item component={Card}>
            <CardContent>
                <Typography color='textSecondary ' gutterBottom>Recovered</Typography>
                <Typography variant='h5'>Real Data</Typography>
                <Typography color="textSecondary"> real date</Typography>
                <Typography variant='body2'>Number of recoveries from COVID-19</Typography>
            </CardContent>
        </Grid>
        <Grid item component={Card}>
            <CardContent>
                <Typography color='textSecondary ' gutterBottom>Deaths</Typography>
                <Typography variant='h5'>Real Data</Typography>
                <Typography color="textSecondary"> real date</Typography>
                <Typography variant='body2'>Number of deaths caused by COVID-19</Typography>
            </CardContent>
        </Grid>
    </Grid>

  </div>
 );
}
export default Cards;