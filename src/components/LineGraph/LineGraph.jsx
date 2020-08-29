import React, {useEffect, useState} from 'react';
import {Line} from "react-chartjs-2";
import numeral from 'numeral';

const options = {
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
            await fetch('https://disease.sh/v3/covid-19/historical/all?lastdays=all')
                .then(response => response.json())
                .then(data => {
                    console.log('line', data);
                    let chartData = chartDate(data)
                    setData(chartData);
                });
        };
        fetchData()
    }, [caseType]);


    //todo:: change component name? extract fetch to API, change graf colorm data? mew synax
    return (
        <div>
            {data?.length > 0 && (
                <Line data={{
                    datasets: [{
                        data: data,
                        backgroundColor: 'rgba(255, 0, 0, 0.5)',
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