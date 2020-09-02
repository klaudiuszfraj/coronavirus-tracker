import React from 'react';
import {Card, Table} from "@material-ui/core";
import style from './TableCountries.module.scss'


function TableCountries({countriesInfo}) {

    const sort = (data) => {
        const sortedData = [...data];
        sortedData.sort((a,b) => (b.cases - a.cases ));
        return sortedData;
    }

    const sortedCountries = sort(countriesInfo);
    console.log(sortedCountries);

    return (
        <Card className={style.table}>
            <h2>Live Cases by Country</h2>
            <Table>
                <tbody>
                {sortedCountries.map(countryInfo => (
                    <tr key={countryInfo.country}>
                        <td>{countryInfo.country}</td>
                        <td>{countryInfo.cases}</td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </Card>
    );
}

export default TableCountries;