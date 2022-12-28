import React, { useState, useEffect } from 'react';
import { NativeSelect, FormControl, FormHelperText } from "@mui/material";

import style from './CountryPicker.module.scss';

function CountryPicker({ changeCountry, countriesInfo }) {
    const [fetchedCountries, setFetchedCountries] = useState([]);


    useEffect(()=>{
        setFetchedCountries(()=>{
            return countriesInfo.map(country => country.country)
        })
    },[countriesInfo])


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