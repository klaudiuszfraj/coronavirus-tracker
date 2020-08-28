import React, { useState, useEffect } from 'react';
import { NativeSelect, FormControl, FormHelperText } from "@material-ui/core";
import { fetchCountriesList } from "../../api";

import style from './CountryPicker.module.scss';

function CountryPicker({ changeCountry }) {
    const [fetchedCountries, setFetchedCountries] = useState([]);

    useEffect(() => {
        const fetchAPI = async ()=>{
            setFetchedCountries(await fetchCountriesList())
        }
        fetchAPI()
    },[setFetchedCountries]);


    return (
    <FormControl className={style.formControl}>
        <NativeSelect defaultValue='global' onChange={(e)=>changeCountry(e.target.value)}>
            <option value='global'>Global</option>
            {fetchedCountries.map(country => <option key={country} value={country}>{country}</option>)}
        </NativeSelect>
        <FormHelperText>Choose country</FormHelperText>
    </FormControl>
 );
}
export default CountryPicker;