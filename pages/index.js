import Head from 'next/head'
import { useEffect, useState, useCallback,useRef } from 'react';
import styles from '../styles/Home.module.css'
import dynamic from 'next/dynamic';
import MainWeather from '../components/mainweather'
const VMap = dynamic(() => import('../components/vmaps'),{ ssr: false })

export default function Home() {

  const [latlong, setLatLong] = useState([51.505,-0.09])
    const callback = useCallback((coords) => {
      setLatLong(coords);
    }, []);



  return (
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
      
      <VMap  parentCallback={callback} /> 
      <MainWeather slatlong={latlong} />  
      </main>
      
      <footer className={styles.footer}>
            Data Provided by<pre> <a href="https://open-meteo.com/"> https://open-meteo.com</a></pre>
      </footer>
    </div>
  ) 
}
