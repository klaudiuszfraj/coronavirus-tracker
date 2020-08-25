import React from 'react';
import {Card, CardContent, Typography, Grid} from "@material-ui/core";
import CountUp from "react-countup";
import cx from 'classnames';

import style from './Cards.module.scss'


function Cards({data: {confirmed, recovered, deaths, lastUpdate}}) {
    console.log(confirmed);
    if (!confirmed) {
        return 'Loading...';
    }
    const cards = [
        {
            class: style.infected,
            label: 'Infected',
            value: confirmed.value,
            text: 'Number of active cases of COVID-19'
        },
        {
            class: style.recovered,
            label: 'Recovered',
            value: recovered.value,
            text: 'Number of recoveries from COVID-19'
        },
        {
            class: style.deaths,
            label: 'Deaths',
            value: deaths.value,
            text: 'Number of deaths caused by COVID-19'
        }
    ]
    return (
        <div className={style.container}>
            <Grid container spacing={3} justify='center'>
                {cards.map(card => (
                    <Grid key={card.label} item component={Card} xs={12} md={3} className={cx(style.card, card.class)}>
                        <CardContent>
                            <Typography color='textSecondary' gutterBottom>{card.label}</Typography>
                            <Typography variant='h5'>
                                <CountUp end={card.value}
                                         start={0}
                                         duration={2.5}
                                         separator={','}/>
                            </Typography>
                            <Typography color='textSecondary'>{new Date(lastUpdate).toLocaleDateString()}</Typography>
                            <Typography variant='body2'>{card.text}</Typography>
                        </CardContent>
                    </Grid>
                ))}
            </Grid>

        </div>
    );
}

export default Cards;