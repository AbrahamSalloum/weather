
import { useState } from 'react';
import React from 'react';
import { DateTime } from "luxon";
import { useMapProvider } from "./MapProvider";
import TempHumidityRainGraph from './mainweather/TempHumidityRainGraph';
import CloudCoverGraph from './mainweather/CloudCoverGraph';
import WindSpeedGraph from './mainweather/WindSpeedGraph';
import WeeklyForcast from './mainweather/WeeklyForecast';
import Quicksummary from './mainweather/QuickSummary';
import styles from '../styles/Home.module.css'
import SearchBox from '../components/SearchBox'
import Head from 'next/head'
import dynamic from 'next/dynamic';
const VMap = dynamic(() => import('../components/vmaps'), { ssr: false })


const MainWeather = ({ latlong }) => {

    const [weather, setweather] = useState(false)
    const [chartdata, setChartData] = useState(false)
    const [tz_name, setTz_name] = useState('UTC')

    const getweather = async () => {
        const tz = await fetch(`/api/tz/${latlong.join(',')}`)
        const tz_name_f = await tz.json()
        setTz_name(tz_name_f.tz[0])

        const weather = await fetch(`https://api.open-meteo.com/v1/forecast?${createAPISting(tz_name_f)}`)
        const rawWeatherData = await weather.json()
        setweather(rawWeatherData)
        formatData(rawWeatherData)
    }


    const createAPISting = (tz_name_f) => {
        let params = {
            latitude: [latlong[0]],
            longitude: [latlong[0]],
            hourly: ["temperature_2m", "relative_humidity_2m", "apparent_temperature", "precipitation", "cloudcover", "windspeed_10m", "cloudcover", "weathercode", "winddirection_10m"],
            daily: ["weathercode", "temperature_2m_max", "temperature_2m_min", "apparent_temperature_max", "apparent_temperature_min", "sunrise", "sunset", "precipitation_sum", "precipitation_hours"],
            timezone: [tz_name_f.tz[0]]
        }
        let urlstring = "";
        Object.keys(params).forEach((item) => {
            urlstring += `${item}=${params[item].join(',')}&`
        })

        return urlstring;
    }

    const formatData = (rawWeatherData) => {
        let graphdata = []
        for (let i in rawWeatherData.hourly.time) {
            graphdata.push({
                unixtime: DateTime.fromISO(rawWeatherData.hourly.time[i]).toMillis(),
                rawtime: rawWeatherData.hourly.time[i],
                name: DateTime.fromISO(rawWeatherData.hourly.time[i], { zone: tz_name }).toLocaleString(DateTime.DATETIME_SHORT),
                uv: rawWeatherData?.hourly?.temperature_2m?.[i],
                pv: rawWeatherData?.hourly?.apparent_temperature?.[i],
                cc: rawWeatherData?.hourly?.cloudcover?.[i],
                weathercode: rawWeatherData?.hourly?.weathercode?.[i],
                precipitation: rawWeatherData?.hourly?.precipitation?.[i],
                windspeed: rawWeatherData?.hourly?.windspeed_10m?.[i],
                winddirection: rawWeatherData?.hourly?.winddirection_10m?.[i],
                humidity: rawWeatherData?.hourly?.relative_humidity_2m?.[i]
            })
        }

        const q = graphdata.sort((a, b) => {
            if (a.unixtime < b.unixtime < 0) return -1
            if (a.unixtime > b.unixtime < 0) return 1
            return 0
        })

        setChartData(q)
    }

    return (
        <>
            <div style={{ "display": "flex", "flexDirection": "row", "width": "100%", "alignItems": "center" }}>
                <button onClick={() => getweather()} className={styles.bbutton}>Get Weather</button>
            </div>
            {!!chartdata ? <WeatherData weather={weather} chartdata={chartdata} tz_name={tz_name} /> : null }
        </>
    )

}


const WeatherData = ({ weather, chartdata,  tz_name}) => {
    return (
        <div style={{ "display": "flex", "flexDirection": "column", "width": "100%" }}>

            {!!chartdata ?
                <>
                    <div className={styles.graph}>
                        <TempHumidityRainGraph chartdata={chartdata} />
                    </div >
                    <div className={styles.split}>
                        <div className={styles.graph}>
                            <CloudCoverGraph chartdata={chartdata} />
                        </div>
                        <div className={styles.graph}>
                            <WindSpeedGraph chartdata={chartdata} />
                        </div>
                    </div>
                    <div><WeeklyForcast weather={weather} tz_name={tz_name} /></div>
                </>
                : null
            }
        </div>
    )
}

const WeatherWrapper = ({ host, latlong }) => {
    return (
        <div className={styles.container}>
            <div className={styles.menu}>
                <div><a href={`//${host}/${latlong.join(',')}`}>{`/${latlong.join(',')}`}</a></div>
                <div className={styles.searchWrapper}>
                    <SearchBox />
                </div>
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
                <MainWeather latlong={latlong} />
            </main>
            <footer className={styles.footer}>
                Data Provided by<pre> <a href="https://open-meteo.com/" target="_blank" rel="noopener noreferrer"> https://open-meteo.com</a></pre>
            </footer>
        </div>
    );
}

export default WeatherWrapper
