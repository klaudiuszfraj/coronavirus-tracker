import React, { useState, useEffect } from 'react';
import { fetchDailyDate} from "../../api";
import { Line, Bar } from "react-chartjs-2";
import style from './Chart.module.scss';
import cx from 'classnames';
import numeral from "numeral";

function Chart({ data: { cases, deaths, recovered }, country}) {
    const [dailyData, setDailyData] = useState([]);

    useEffect(()=>{
        const fetchAPI = async ()=>{
            const dailyData = await fetchDailyDate();
            // setDailyData(dailyData);
        }
        fetchAPI();
    },[])

    const lineChart = (
        dailyData.length !== 0
        ? (
            <Line
                data={{
                    labels: dailyData.map(({date}) => date),
                    datasets: [{
                        data: dailyData.map(({ confirmed }) => confirmed),
                        label: 'Cases',
                        borderColor: '#33f',
                        fill: true
                    },{
                        data: dailyData.map(({ deaths }) => deaths),
                        label: 'Deaths',
                        borderColor: 'rgba(255, 0, 0, 0.5)',
                        fill: true
                    }]
                }}
                options={{
                    maintainAspectRatio: false,
                    title:{
                        display: true,
                        text: 'All data per day'
                    },
                    scales: {
                        // xAxes: [
                        //     {
                        //         type: 'time',
                        //         time: {
                        //             format: 'MM/DD/YY',
                        //         },
                        //     },
                        // ],
                        yAxes: [
                            {
                                gridLines: {
                                    display: false,
                                },
                                ticks: {
                                    callback: function (value, index, values) {
                                        return numeral(value).format('0a');
                                    },
                                },
                            },
                        ],
                    }
                }}
            />)
        : null
    );
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
                    legend: { display: false },
                    title: { display: true, text: `Current state in ${country}`}
                }}

            />
            ): null
    );

 return (
  <div className={cx(style.chart, 'container')}>
      {country ? barChart : lineChart}
  </div>
 );
}
export default Chart;