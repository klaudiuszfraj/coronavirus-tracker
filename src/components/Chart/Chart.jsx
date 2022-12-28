import React from 'react';
import {Line, Bar} from "react-chartjs-2";
import {Chart as CartJS} from 'chart.js/auto'
import style from './Chart.module.scss';

function Chart({data: {cases, deaths, recovered, todayCases, todayRecovered, todayDeaths}, country}) {


    const lineChart = <Line
        data={{
            labels: ['Infected', 'Revovered', 'Deaths'],
            datasets: [{
                // label: 'People',
                backgroundColor: [
                    'rgba(0, 0, 255, 0.5)',
                    'rgba(0, 255, 0, 0.5)',
                    'rgba(255, 0, 0, 0.5)'
                ],
                data: [todayCases, todayRecovered, todayDeaths]
            }]
        }}
        options={{
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Today cases'
                },
                legend: {display: false},

            },
        }}
    />


    const barChart = (
        cases
            ? (
                <Bar
                    data={{
                        labels: ['Infected', 'Revovered', 'Deaths'],
                        datasets: [{
                            label: 'People',
                            backgroundColor: [
                                'rgba(0, 0, 255, 0.5)',
                                'rgba(0, 255, 0, 0.5)',
                                'rgba(255, 0, 0, 0.5)'
                            ],
                            data: [cases, recovered, deaths]
                        }]
                    }}
                    options={{
                        plugins: {
                            title: {display: true, text: `Current state in ${country}`},
                            legend: {display: false},
                        },
                    }}

                />
            ) : null
    );

    return (
        <div className={`${style.chart} container`}>
            {country ? barChart : lineChart}
        </div>
    );
}

export default Chart;