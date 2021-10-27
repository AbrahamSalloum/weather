

import { MapContainer, TileLayer,useMapEvents } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { useMapProvider } from "./MapProvider.js";

const  Vmap = () => {

  const {setCmap} = useMapProvider()
  const {latlong, setLatLong} = useMapProvider()

  const  InitialThings = () => {
    const map = useMapEvents({
      click() {
        map.locate()
      },
      load(){
        //map.locate()
        map.flyTo(latlong, 14, {
          duration: 2
        });
      },
      locationfound(ev) {
        setLatLong([ev.latlng[0], ev.latlng[1]])
        map.setView(ev.latlng)
      },
      moveend(ev){
        let ltlng = [ev.target.getCenter().lat, ev.target.getCenter().lng]
        setLatLong(ltlng)
      },
    }) 
    return null
  }


    return(
        <div className="map_container">
        <MapContainer 
          center={latlong} 
          zoom={13} 
          scrollWheelZoom={true} 
          whenCreated={setCmap}
          style={{ height: "450px", width: "100%" }}> 
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        <InitialThings />
      </MapContainer>   
      <style jsx>{`
      .map_container {
        margin-left: auto; 
        margin-right: auto; 
        display: block;
        height: 100%; 
        width: 95%; 
      }

      .width {
        height: 100%; 
        width: 100%; 
        margin:0; 
        padding: 0; 
      }
    `}</style>        
      </div>
    )
}

export default Vmap