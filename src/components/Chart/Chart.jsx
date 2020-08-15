import React, { useState, useEffect } from 'react';
import { fetchDailyDate} from "../../api";
import { Line, Bar } from "react-chartjs-2";
import style from './Chart.module.css';

function Chart({ data: { confirmed, deaths, recovered }, country}) {
    const [dailyData, setDailyData] = useState([]);

    useEffect(()=>{
        const fetchAPI = async ()=>{
            const dailyDeta = await fetchDailyDate();
            setDailyData(dailyDeta);
        }

        console.log(dailyData);
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
                        label: 'Infected',
                        borderColor: '#33f',
                        fill: true
                    },{
                        data: dailyData.map(({ deaths }) => deaths),
                        label: 'Deaths',
                        borderColor: 'rgba(255, 0, 0, 0.5)',
                        fill: true
                    }]
                }}
            />)
        : null
    );
    const barChart = (
        confirmed
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
                        data: [confirmed.value, recovered.value, deaths.value]
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
  <div className={style.container}>
      {country ? barChart : lineChart}
  </div>
 );
}
export default Chart;