import { createContext, useEffect, useState, useContext } from "react";


export const MapContext = createContext();

export const useMapProvider = () => {
  return useContext(MapContext);
};

export const MapProvider = ({ children }) => {
  const [cmap, setCmap] = useState({});
  const [latlong, setLatLong] = useState([51.505, -0.09]);

  return (
    <MapContext.Provider
      value={{ cmap, setCmap, latlong, setLatLong }}
    >
      {children}
    </MapContext.Provider>
  );

};
