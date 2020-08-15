import axios from 'axios';

const API_URL = 'https://covid19.mathdro.id/api';

export const fetchData = async ()=>{
    try {
        const { data: {confirmed, recovered, deaths, lastUpdate } } = await axios.get(API_URL);

        return { confirmed, recovered, deaths, lastUpdate };

    } catch (error){

    }
};
