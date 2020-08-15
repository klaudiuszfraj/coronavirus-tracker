import React, {Component} from 'react';

import { Cards, Chart, CountryPicker } from "./components";
import style from './App.module.css'
import { fetchData } from "./api";

class App extends Component {
    state = {
        data: {},
        country: ''
    }

    async componentDidMount() {
        const fetchedData = await fetchData();
        this.setState({ data: fetchedData })
    }

    handleCountryChange = async (country)=>{
        const fetchedCountryData = await fetchData(country);
        this.setState({ data: fetchedCountryData, country: country})
    }


    render() {
        const { data, country } =this.state;
        return (
            <div className={style.container}>
                <Cards data={data}/>
                <CountryPicker changeCountry={this.handleCountryChange}/>
                <Chart data={data} country={country}/>
            </div>
        );
    }
}

export default App;