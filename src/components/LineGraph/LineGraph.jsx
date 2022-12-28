import React, {useEffect, useState} from 'react';
import {Bar} from 'react-chartjs-2';
import {Chart as CartJS} from 'chart.js/auto'
import numeral from 'numeral';
import {fetchHistoricalAll} from "../../api";
import cx from 'classnames';
import style from './LineGraph.module.scss';

const chartDate = (data, caseType = 'cases') => {
    const dataChart = [];
    let lastDataPoint;
    for (let date in data.cases) {
        if (lastDataPoint) {
            let newDataPoint = {
                x: date,
                y: Math.abs(data[caseType][date] - lastDataPoint),
            };
            dataChart.push(newDataPoint)
        }
        lastDataPoint = data[caseType][date];
    }
    return dataChart.slice(0, 400);;
}

function LineGraph({caseType}) {
    const [data, setData] = useState({});
    const [historicalData, setHistoricalData] = useState({});
    //todo:: extrat fetch to app
    useEffect(() => {
        const fetchData = async () => {
            const fetchHistoricalData = await fetchHistoricalAll();
            setHistoricalData(fetchHistoricalData);
        };
        fetchData()
    }, []);
    useEffect(() => {
        let chartData = chartDate(historicalData, caseType);
        setData(chartData);
    }, [historicalData, caseType])

    const casesTypeColors = {
        cases: {
            hex: 'rgba(0, 0, 255, 0.5)',
        },
        recovered: {
            hex: 'rgba(0, 255, 0, 0.5)',
        },
        deaths: {
            hex: 'rgba(255, 0, 0, 0.5)',
        }
    }

    const options = {
        elements: {
            point: {
                radius: 0,
            },
        },
        maintainAspectRatio: false,
        tooltips: {
            mode: 'index',
            intersect: false,
            callbacks: {
                label: function (tooltipItem, data) {
                    return numeral(tooltipItem.value).format('+0,0');
                },
            },
        },
    };

    //todo:: change component name?, change graf colorm data? mew synax
    return (
        <div className={cx(style.lineGraph, 'container')}>
            {data?.length > 0 && (
                <Bar data={{
                    datasets: [{
                        data: data,
                        backgroundColor: casesTypeColors[caseType].hex,
                        color: 'CC1034',
                        label: caseType
                    }]
                }}
                      options={options}
                />
            )}

        </div>
    );
}

export default LineGraph;