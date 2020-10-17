import React, {Component} from 'react';

import { Cards, Chart, CountryPicker, TableCountries, LineGraph, Map } from "./components";
import style from './App.module.scss';
import coronaImage from './images/image.png'
import { fetchData, fetchCountriesInfo } from "./api";

class App extends Component {
    state = {
        data: {},
        country: '',
        countriesInfo: [],
        mapCenter: {lat: 52, lng: 20},
        mapZoom: 3,
        caseType: 'cases'
    }

    async componentDidMount() {
        const fetchedData = await fetchData();
        this.setState({ data: fetchedData });

        const fetchedCountriesInfo = await fetchCountriesInfo();
        this.setState({ countriesInfo: fetchedCountriesInfo });

        const interval = ()=> {
            let index = 0;
            setInterval(()=>{
                const cards = ['cases', 'recovered', 'deaths'];
                this.setState({caseType: cards[index]});
                index++;
                if (index ===3){
                    index=0;
                }
            },5000)

        }
        interval();

    }

    handleCountryChange = async (country)=>{
        const fetchedCountryData = await fetchData(country);
        this.setState({
            data: fetchedCountryData,
            country: country,
            mapCenter: {
                lat: country==='global' ? 52 : fetchedCountryData.countryInfo.lat,
                lng: country==='global' ? 20 : fetchedCountryData.countryInfo.long
            }
        })
    }

    handleCaseChange = (caseType)=> {
        this.setState({caseType: caseType})
    }
    //todo:: setstate in props?
    render() {
        const { data, country, caseType, countriesInfo, mapCenter, mapZoom } =this.state;
        return (
            <div className={style.app__container}>
                <div className={style.app__main}>
                <img className={style.image} src={coronaImage} alt='COVID-19'/>
                <Cards data={data} onCaseType={this.handleCaseChange}/>
                <CountryPicker changeCountry={this.handleCountryChange} countriesInfo={countriesInfo}/>
                <Map center={mapCenter} zoom={mapZoom} countriesInfo={countriesInfo} caseType={caseType}/>
                </div>

                <div className={style.app__secondary}>
                {/*Table global deaths/recovers in country*/}
                {/*Table cases by country*/}
                <TableCountries countriesInfo={countriesInfo}/>
                <LineGraph caseType={caseType}/>
                {/*Cart with case*/}
                <Chart data={data} country={country}/>
                </div>
            </div>
        );
    }
}

export default App;