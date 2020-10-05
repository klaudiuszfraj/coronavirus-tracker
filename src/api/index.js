import axios from 'axios';

const API_URL1 = 'https://covid19.mathdro.id/api';
const API_URL = 'https://disease.sh/v3/covid-19';


export const fetchData = async (country= "global")=>{

    const changeApiUrl =
        country === 'global'
        ? `${API_URL}/all`
            : `${API_URL}/countries/${country}`;

    try {
        const {data} = await axios.get(`${changeApiUrl}`);
        console.log('fetchData',data);
        return data;
    } catch (error){
        console.log(error);
    }
};
export const fetchDailyDate = async ()=>{
    try {
        const { data } = await axios.get(`${API_URL1}/daily`)
        console.log('fetch data daily api',data);

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

export const fetchCountriesInfo = async ()=>{
    try {
        const {data} = await axios.get(`${API_URL}/countries`);
        console.log('fetchCountriesInfo',data);
        return data;
    } catch (error){
        console.log(error);
    }
}

export const fetchHistoricalAll = async ()=>{
    try {
        const {data} = await axios.get(`${API_URL}/historical/all?lastdays=all`);
        console.log('fetchHistoricalAll',data);
        return data;
    }
    catch (error){
        console.log(error);
    }
}