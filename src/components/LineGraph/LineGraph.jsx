import React, {useEffect, useState} from 'react';
import {Line} from "react-chartjs-2";
import numeral from 'numeral';
import {fetchHistoricalAll} from "../../api";
import cx from 'classnames';
import style from './LineGraph.module.scss';

const options = {

    title:{
        display: true,
            text: `All cases`
    },
    legend: {
        display: false
    },
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
    scales: {
        xAxes: [
            {
                type: 'time',
                time: {
                    format: 'MM/DD/YY',
                    tooltipFormat: 'll',
                },
            },
        ],
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
    },
};

const chartDate = (data, caseType = 'cases') => {
    const dataChart = [];
    let lastDataPoint;
    for (let date in data.cases) {
        if (lastDataPoint) {
            let newDataPoint = {
                x: date,
                y: data[caseType][date] - lastDataPoint
            };
            dataChart.push(newDataPoint)
        }
        lastDataPoint = data[caseType][date];
    }
    return dataChart;
}

function LineGraph({caseType}) {
    const [data, setData] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            const fetchHistoricalData = await fetchHistoricalAll();
            let chartData = chartDate(fetchHistoricalData, caseType);
            setData(chartData);
        };
        fetchData()
    }, []);

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
    //todo:: change component name?, change graf colorm data? mew synax
    return (
        <div className={cx(style.lineGraph, 'container')}>
            {data?.length > 0 && (
                <Line data={{
                    datasets: [{
                        data: data,
                        backgroundColor: casesTypeColors[caseType].hex,
                        color: 'CC1034',
                    }]
                }}
                      options={options}
                />
            )}

        </div>
    );
}

export default LineGraph;