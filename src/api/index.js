import axios from 'axios';

const API_URL1 = 'https://covid19.mathdro.id/api';
const API_URL = 'https://disease.sh/v3/covid-19';


export const fetchData = async (country)=>{
    console.log('fetch data api');
    let changeApiUrl = API_URL1;
    if (country){
        changeApiUrl = `${API_URL1}/countries/${country}`
    }

    try {
        const { data: {confirmed, recovered, deaths, lastUpdate } } = await axios.get(changeApiUrl);

        return { confirmed, recovered, deaths, lastUpdate };
    } catch (error){
        console.log(error);
    }
};
export const fetchDailyDate = async ()=>{
    console.log('fetch data daily api');
    try {
        const { data } = await axios.get(`${API_URL1}/daily`)

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
        const {data} = await axios.get(`${API_URL}/countries`);
        return data.map(countries=>countries.country);
    } catch (error){
        console.log(error);
    }


    // try {
    //     const { data: { countries } } = await axios.get(`${API_URL}/countries`);
    //      return countries.map(country => country.name);
    //
    //
    // } catch (error){
    //     console.log(error);
    // }
}