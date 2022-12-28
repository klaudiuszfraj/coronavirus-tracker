import React from 'react';
import {MapContainer, TileLayer, Circle, Popup} from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import style from './Map.module.scss';
import numeral from 'numeral';
import cx from 'classnames';

//todo:: repeated part
const casesTypeColors = {
    cases: {
        hex: 'rgba(0, 0, 255, 0.5)',
        multiplier: 40
    },
    recovered: {
        hex: 'rgba(0, 255, 0, 0.5)',
        multiplier: 40
    },
    deaths: {
        hex: 'rgba(255, 0, 0, 0.5)',
        multiplier: 50
    }


}

//todo:: change country names
function Map({center, zoom, countriesInfo, caseType}) {
    window.dispatchEvent(new Event('resize'));
    const showDataOnMap = (data, caseType='cases')=> (
        data.map(country => (
            <Circle
                key={country.country}
                center={[country.countryInfo.lat, country.countryInfo.long]}
                fillOpacity={0.4}
                radius={
                    Math.sqrt(country[caseType]) * casesTypeColors[caseType].multiplier
                }
                pathOptions={
                    {
                        color: casesTypeColors[caseType].hex,
                        fillColor: casesTypeColors[caseType].hex
                    }}
            >
                <Popup>
                    <div className={style.popup}>
                        <div className={style.flag} style={{backgroundImage: `url(${country.countryInfo.flag})`}}/>
                        <div className={style.countryName}>{country.country}</div>
                        <div className={style.confirmed}>Cases: {numeral(country.cases).format('0,0')}</div>
                        <div className={style.recovered}>Recovered: {numeral(country.recovered).format('0,0')}</div>
                        <div className={style.deaths}>Deaths: {numeral(country.deaths).format('0,0')}</div>
                    </div>
                </Popup>
            </Circle>

        ))
    );


    return (
        <div className={cx(style.map, 'container')}>
            <MapContainer center={center} zoom={zoom}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {showDataOnMap(countriesInfo, caseType)}
            </MapContainer>
        </div>
    );
}

export default Map;