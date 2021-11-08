import Head from 'next/head'
import { useEffect, useState} from 'react';
import styles from '../styles/Home.module.css'
import dynamic from 'next/dynamic';
import MainWeather from '../components/mainweather'
import SearchBox from '../components/SearchBox'
import { useMapProvider } from "../components/MapProvider";
const VMap = dynamic(() => import('../components/vmaps'),{ ssr: false })


export default function Home() {
  const {latlong} = useMapProvider()
  const [host, setHost] = useState(null)

  useEffect(() => {
    setHost(window.location.host)
  }, [])

 
  return (
    <div className={styles.container}>
      <div className="menu">
        <div><a href={`//${host}/${latlong.join(',')}`}>{`/${latlong.join(',')}`}</a></div>
        <div className="searchWrapper"><SearchBox/></div>
      </div>
      <Head>
        <title>Weather</title>
        <meta name="description" content="Weather" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h2 className={styles.title}>Weather</h2>
        <div>Click in map for best guess location or search</div>
        <VMap />
        <MainWeather />  
      </main>
      <footer className={styles.footer}>
        Data Provided by<pre> <a href="https://open-meteo.com/" target="_blank" rel="noopener noreferrer"> https://open-meteo.com</a></pre>
      </footer>
      <style jsx>{`
        .menu {
          display: flex; 
          width: 100%;
          justify-content: space-between;
        }

        @media (max-width: 500px) {
          .menu {
            flex-direction: column; 
            justify-content: space-evenly;
            width: 100%;
          }
        }
        
        .searchWrapper {
          height: 0px; 
          z-index: 999; 
        }
      `}</style>
    </div>
  ) 
}