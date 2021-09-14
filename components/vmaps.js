

import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvent, useMapEvents, MapConsumer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { useEffect, useState, memo } from 'react'

const  Vmap = ({parentCallback}) => {

  const [latlong, setLatLong] = useState([51.505,-0.09])

  const  InitialThings = () => {
    const map = useMapEvents({
      click(ev) {
        map.locate()
      },
      load(ev){
        map.locate()
      },
      locationfound(ev) {
        setLatLong(ev.latlng)
        map.setView(ev.latlng)
      },
      moveend(ev){
      let ltlng = [ev.target.getCenter().lat, ev.target.getCenter().lng]
      setLatLong(ltlng)
      parentCallback(ltlng)
      },
    }) 
    return null
  }

    return(
        <div style={{ height: "100%", width: "100%", margin: 0, padding: 0 }}>
        {JSON.stringify(latlong)}
        <MapContainer center={latlong} zoom={13} scrollWheelZoom={true} style={{ height: "450px", width: "100%" }}>
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        
        <InitialThings />
      </MapContainer>           
      </div>
    )
}

export default memo(Vmap)