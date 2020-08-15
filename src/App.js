import React, {Component} from 'react';

import { Cards, Chart, CountryPicker } from "./components";
import style from './App.module.css'

class App extends Component {
    render() {
        return (
            <div className={style.container}>
                <Cards/>
                <CountryPicker/>
                <Chart/>
            </div>
        );
    }
}

export default App;