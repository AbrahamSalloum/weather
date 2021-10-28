import { createContext, useEffect, useState, useContext } from "react";
import { useRouter } from 'next/router'

export const MapContext = createContext();

export const useMapProvider = () => {
  return useContext(MapContext);
};

export const MapProvider = ({ children }) => {
  const [cmap, setCmap] = useState({});
  const router = useRouter()
  const r = router.query
  const [latlong, setLatLong] = useState([51.505, -0.09]);



  const isCoords = (coords) => {
    if(coords.length == 2){
      if((isNaN(coords[0]) && isNaN(coords[1])) === false){
        return true
      }
    }
    return false
  }

  useEffect(() => {
    if(!!r.loc == false) return                             // if no coord in url return                 
    if( isCoords(r.loc[0].split(',')) ){                    // if coords makes snese then:      
      setLatLong(r.loc[0].split(','))                       // set as global-coords
    }
  }, [r])

  // useEffect(() => {
  //   router.push(latlong.join(','), undefined, { shallow: true })
  // }, [latlong])
  
  return (
    <MapContext.Provider
      value={{ cmap, setCmap, latlong, setLatLong }}
    >
      {children}
    </MapContext.Provider>
  );

};
