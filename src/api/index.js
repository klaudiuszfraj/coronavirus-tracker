import axios from 'axios';

const API_URL = 'https://covid19.mathdro.id/api';

export const fetchData = async ()=>{
    try {
        const { data: {confirmed, recovered, deaths, lastUpdate } } = await axios.get(API_URL);

        return { confirmed, recovered, deaths, lastUpdate };
    } catch (error){
        console.log(error);
    }
};
export const fetchDailyDate = async ()=>{
    try {
        const { data } = await axios.get(`${API_URL}/daily`)

        const mofifiadData = data.map(daileData => ({
            confirmed: daileData.confirmed.total,
            deaths: daileData.deaths.total,
            date: daileData.reportDate
        }));

        return mofifiadData;
    } catch (error){
        console.log(error);
    }
}

export const fetchCountries = async ()=>{
    try {
        const { data: { countries } } = await axios.get(`${API_URL}/countries`);
         return countries.map(country => country.name);


    } catch (error){
        console.log(error);
    }
}