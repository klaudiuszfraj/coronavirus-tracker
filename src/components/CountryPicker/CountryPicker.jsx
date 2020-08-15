import React, { useState, useEffect } from 'react';
import { NativeSelect, FormControl } from "@material-ui/core";
import { fetchCountries } from "../../api";

import style from './CountryPicker.module.css';

function CountryPicker({ changeCountry }) {
    const [fetchedCountries, setFetchedCountries] = useState([]);

    useEffect(() => {
        const fetchAPI = async ()=>{
            setFetchedCountries(await fetchCountries())
        }
        fetchAPI()
    },[setFetchedCountries]);


    return (
    <FormControl className={style.formControl}>
        <NativeSelect defaultValue='' onChange={(e)=>changeCountry(e.target.value)}>
            <option value='global'>Global</option>
            {fetchedCountries.map(country => <option key={country} value={country}>{country}</option>)}
        </NativeSelect>
    </FormControl>
 );
}
export default CountryPicker;