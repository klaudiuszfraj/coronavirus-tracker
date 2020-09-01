import React from 'react';
import {Card, CardContent, Typography, Grid} from "@material-ui/core";
import CountUp from "react-countup";
import cx from 'classnames';

import style from './Cards.module.scss'


function Cards({data: {cases, recovered, deaths, updated}, onCaseType}) {
    if (!cases) {
        return 'Loading...';
    }
    const cards = [
        {
            class: style.infected,
            label: 'Infected',
            value: cases,
            text: 'Number of active cases of COVID-19',
            caseType: 'cases'
        },
        {
            class: style.recovered,
            label: 'Recovered',
            value: recovered,
            text: 'Number of recoveries from COVID-19',
            caseType: 'recovered'
        },
        {
            class: style.deaths,
            label: 'Deaths',
            value: deaths,
            text: 'Number of deaths caused by COVID-19',
            caseType: 'deaths'
        }
    ]
    return (
        <div className={style.container}>
            <Grid container spacing={3} justify='center'>
                {cards.map(card => (
                    <Grid key={card.label}
                          item
                          component={Card}
                          xs={12} md={3}
                          className={cx(style.card, card.class)}
                          onClick={() => onCaseType(card.caseType)}
                    >
                        <CardContent>
                            <Typography color='textSecondary' gutterBottom>{card.label}</Typography>
                            <Typography variant='h5'>
                                <CountUp end={card.value}
                                         start={0}
                                         duration={2.5}
                                         separator={','}/>
                            </Typography>
                            <Typography color='textSecondary'>{new Date(updated).toLocaleDateString()}</Typography>
                            <Typography variant='body2'>{card.text}</Typography>
                        </CardContent>
                    </Grid>
                ))}
            </Grid>

        </div>
    );
}

export default Cards;