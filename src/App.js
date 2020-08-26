import React, {Component} from 'react';

import { Cards, Chart, CountryPicker } from "./components";
import style from './App.module.scss';
import coronaImage from './images/image.png'
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
                {/*Header*/}
                <img className={style.image} src={coronaImage} alt='COVID-19'/>

                {/*Cards*/}
                <Cards data={data}/>

                {/*Dropdown*/}
                <CountryPicker changeCountry={this.handleCountryChange}/>

                {/*Map*/}

                {/*Table global deaths/recovers in country*/}

                {/*Table cases by country*/}

                {/*Cart with case*/}
                {/*<Chart data={data} country={country}/>*/}

            </div>
        );
    }
}

export default App;