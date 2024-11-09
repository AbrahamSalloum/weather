import { useEffect, useState} from 'react';
import dynamic from 'next/dynamic';
import { useMapProvider } from "../components/MapProvider";
import WeatherWrapper from '../components/mainweather';


export default function Home() {
  const {latlong} = useMapProvider()
  const [host, setHost] = useState(null)

  useEffect(() => {
    setHost(window.location.host)
  }, [])

 
  return (
        <WeatherWrapper host={host} latlong={latlong}/>
  ) 
}