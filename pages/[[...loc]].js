import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState, useCallback,useRef } from 'react';
import styles from '../styles/Home.module.css'
import dynamic from 'next/dynamic';
import MainWeather from '../components/mainweather'
const VMap = dynamic(() => import('../components/vmaps'),{ ssr: false })

export default function Home() {
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

  const [latlong, setLatLong] = useState([51.505, -0.09])
  
    const callback = useCallback((coords) => {
      setLatLong(coords);
      router.push(coords.join(','), undefined, { shallow: true }) //changes /long,lat in url without reloading
    }, []);

    useEffect(() => {
      if(!!r.loc) {
        if(isCoords(r.loc[0].split(','))) {
          setLatLong(r.loc[0].split(','))
        }
      }
    },[router, r])

  while(router.isReady == false) return '...'
  
  return (
    <div><a href={`//${window.location.host}/${latlong.join(',')}`}>{`/${latlong.join(',')}`}</a>
    <div className={styles.container}>
      <Head>
        <title>Weather</title>
        <meta name="description" content="Weather" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <main className={styles.main}>
        <h2 className={styles.title}>
        Weather
        </h2>  
       Click in map for best guess location
      
      <VMap  parentCallback={callback} slatlong={latlong} /> 
      <MainWeather slatlong={latlong} />  
      </main>
      <footer className={styles.footer}>
            Data Provided by<pre> <a href="https://open-meteo.com/" target="_blank" rel="noopener noreferrer"> https://open-meteo.com</a></pre>
      </footer>
    </div>
    </div>
  ) 
}
