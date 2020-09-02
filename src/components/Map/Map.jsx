import React from 'react';
import {Circle, Map as LeafletMap, Popup, TileLayer} from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import style from './Map.module.scss';
import numeral from 'numeral';
import cx from 'classnames';

//todo:: repeated part
const casesTypeColors = {
    cases: {
        hex: 'rgba(0, 0, 255, 0.5)',
        multiplier: 800
    },
    recovered: {
        hex: 'rgba(0, 255, 0, 0.5)',
        multiplier: 1200
    },
    deaths: {
        hex: 'rgba(255, 0, 0, 0.5)',
        multiplier: 2000
    }


}

//todo:: change country names
function Map({center, zoom, countriesInfo, caseType}) {

    const showDataOnMap = (data, caseType='cases')=> (
        data.map(country => (
            <Circle
                key={country.country}
                center={[country.countryInfo.lat, country.countryInfo.long]}
                fillOpacity={0.4}
                color={casesTypeColors[caseType].hex}
                fillColor={casesTypeColors[caseType].hex}
                radius={
                    Math.sqrt(country[caseType]) * casesTypeColors[caseType].multiplier
                }
                
            >
                {/*todo:: display flag*/}
                <Popup>
                    <div className={style.popup}>
                        <div className={style.flag} style={{ backgroundImage: `url(${country.countryInfo.flag})`}}/>
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
   <LeafletMap center={center} zoom={zoom}>
    <TileLayer
     url={'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'}
     attribution={'&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'}
    />
    {showDataOnMap(countriesInfo, caseType)}

   </LeafletMap>
  </div>
 );
}
export default Map;