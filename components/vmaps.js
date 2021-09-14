

import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvent, useMapEvents, MapConsumer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { useEffect, useState } from 'react'

const  Vmap = ({latlong, parentCallback}) => {

    const [maplatlong, setlonglat] = useState([false,false])

   useEffect(() => {
    setlonglat(latlong)
   },[])   
  
   while(maplatlong[0] === false) return '..'
  
  const SetCenter = () => {

    const map = useMapEvents({
      moveend: (ev) => {
        let ltlng = [ev.target.getCenter().lat, ev.target.getCenter().lng]
        setlonglat(ltlng)
        parentCallback(ltlng)
        return null
      },


    })
    return null
  }

    return(
        <div style={{ height: "100%", width: "100%", margin: 0, padding: 0 }}>
        {JSON.stringify(maplatlong)}
        <MapContainer center={maplatlong} zoom={13} scrollWheelZoom={true} style={{ height: "450px", width: "100%" }}>
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        <SetCenter />
      </MapContainer>           
      </div>
  )
}

export default Vmap