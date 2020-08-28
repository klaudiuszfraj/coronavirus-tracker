import React, {Component} from 'react';

import { Cards, Chart, CountryPicker } from "./components";
import style from './App.module.scss';
import coronaImage from './images/image.png'
import { fetchData, fetchCountriesInfo } from "./api";
import TableCountries from "./components/TableCountries/TableCountries";

class App extends Component {
    state = {
        data: {},
        country: '',
        countriesInfo: []
    }

    async componentDidMount() {
        const fetchedData = await fetchData();
        this.setState({ data: fetchedData });

        const fetchedCountriesInfo = await fetchCountriesInfo();
        this.setState({ countriesInfo: fetchedCountriesInfo })
    }

    handleCountryChange = async (country)=>{
        const fetchedCountryData = await fetchData(country);
        this.setState({ data: fetchedCountryData, country: country})
    }


    render() {
        const { data, country } =this.state;
        return (
            <div className={style.container}>
                {/*Header*/}
                <img className={style.image} src={coronaImage} alt='COVID-19'/>

                {/*Cards*/}
                <Cards data={data}/>

                {/*Dropdown*/}
                <CountryPicker changeCountry={this.handleCountryChange} countriesInfo={this.state.countriesInfo}/>

                {/*Map*/}

                {/*Table global deaths/recovers in country*/}

                {/*Table cases by country*/}
                <TableCountries countriesInfo={this.state.countriesInfo}/>

                {/*Cart with case*/}
                {/*<Chart data={data} country={country}/>*/}

            </div>
        );
    }
}

export default App;