import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect} from 'react';
import styles from '../styles/Home.module.css'
import dynamic from 'next/dynamic';
import MainWeather from '../components/mainweather'
import SearchBox from '../components/SearchBox'
import { useMapProvider } from "../components/MapProvider";
const VMap = dynamic(() => import('../components/vmaps'),{ ssr: false })


export default function Home() {
  const {latlong, setLatLong} = useMapProvider()
  const router = useRouter()
  const r = router.query
  
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
    }, [])

    useEffect(() => {
    if(router.isReady == false) return
      router.push(latlong.join(','), undefined, { shallow: true })
      
    }, [latlong])


  while(router.isReady == false) return '...'
  return (
   
    <div className={styles.container}>
    <a href={`//${window.location.host}/${latlong.join(',')}`}>{`/${latlong.join(',')}`}</a>
      <Head>
        <title>Weather</title>
        <meta name="description" content="Weather" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h2 className={styles.title}>Weather</h2>
        <div>Click in map for best guess location or search:</div>
        <SearchBox/>
        <VMap />
        <MainWeather />  
      </main>
      <footer className={styles.footer}>
            Data Provided by<pre> <a href="https://open-meteo.com/" target="_blank" rel="noopener noreferrer"> https://open-meteo.com</a></pre>
      </footer>
    </div>
   
  ) 
}
