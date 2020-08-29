import React from 'react';
import { Map as LeafletMap, TileLayer } from "react-leaflet";
import 'leaflet/dist/leaflet.css'
import style from './Map.modules.scss'

function Map({center, zoom}) {
 return (
  <div className={style.map}>
   <LeafletMap center={center} zoom={zoom}>
    <TileLayer
     url={'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'}
     attribution={'&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'}
    />


   </LeafletMap>
  </div>
 );
}
export default Map;