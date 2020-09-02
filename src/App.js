import React, {Component} from 'react';

import { Cards, Chart, CountryPicker } from "./components";
import style from './App.module.scss';
import coronaImage from './images/image.png'
import { fetchData, fetchCountriesInfo } from "./api";
import TableCountries from "./components/TableCountries/TableCountries";
import LineGraph from "./components/LineGraph/LineGraph";
import Map from "./components/Map/Map";
//todo:: import form components

class App extends Component {
    state = {
        data: {},
        country: '',
        countriesInfo: [],
        mapCenter: {lat: 34.80746, lng: -40.4796},
        mapZoom: 3,
        caseType: 'cases'
    }

    async componentDidMount() {
        const fetchedData = await fetchData();
        this.setState({ data: fetchedData });

        const fetchedCountriesInfo = await fetchCountriesInfo();
        this.setState({ countriesInfo: fetchedCountriesInfo })
    }

    handleCountryChange = async (country)=>{
        const fetchedCountryData = await fetchData(country);
        this.setState({
            data: fetchedCountryData,
            country: country,
            mapCenter: {
                lat: fetchedCountryData.countryInfo.lat,
                lng: fetchedCountryData.countryInfo.long
            }
        })
    }

    handleCaseChange = (caseType)=> {
        this.setState({caseType: caseType})
    }
    //todo:: setstate in props?
    //todo:: deconstruct the state
    render() {
        const { data, country } =this.state;
        return (
            <div className={style.app__container}>
                {/*Header*/}
                <img className={style.image} src={coronaImage} alt='COVID-19'/>

                {/*Cards*/}
                <Cards data={data} onCaseType={this.handleCaseChange}/>

                {/*Dropdown*/}
                <CountryPicker changeCountry={this.handleCountryChange} countriesInfo={this.state.countriesInfo}/>

                {/*Map*/}

                {/*Table global deaths/recovers in country*/}

                {/*Table cases by country*/}
                <TableCountries countriesInfo={this.state.countriesInfo}/>
                <LineGraph caseType={this.state.caseType}/>
                {/*Cart with case*/}
                <Chart data={data} country={country}/>
                <Map center={this.state.mapCenter} zoom={this.state.mapZoom} countriesInfo={this.state.countriesInfo} caseType={this.state.caseType}/>
            </div>
        );
    }
}

export default App;