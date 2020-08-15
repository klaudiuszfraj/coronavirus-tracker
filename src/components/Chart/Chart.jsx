import React, { useState, useEffect } from 'react';
import { fetchDailyDate} from "../../api";
import { Line, Bar } from "react-chartjs-2";
import style from './Chart.module.css';

function Chart() {
    const [dailyData, setDailyData] = useState([]);

    useEffect(()=>{
        const fetchAPI = async ()=>{
            const dailyDeta = await fetchDailyDate();
            setDailyData(dailyDeta);
        }

        console.log(dailyData);
        fetchAPI();
    })

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


 return (
  <div className={style.container}>
      {lineChart}
  </div>
 );
}
export default Chart;