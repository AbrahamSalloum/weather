
import {useState } from 'react';
import React from 'react';
import { DateTime } from "luxon";
import {useMapProvider} from "./MapProvider";
import TempHumidityRainGraph from './mainweather/TempHumidityRainGraph';
import CloudCoverGraph from './mainweather/CloudCoverGraph';
import WindSpeedGraph from './mainweather/WindSpeedGraph';
import WeeklyForcast from './mainweather/WeeklyForecast';
import Quicksummary from './mainweather/QuickSummary';


const MainWeather = () => {

    const {latlong} = useMapProvider()
    const [weather, setweather]  = useState(false)
    const [chartdata, setChartData] = useState(false)
    const [tz_name, setTz_name] = useState('UTC')
    
    const getweather = async () => {
        const tz = await fetch(`/api/tz/${latlong.join(',')}`)
        const tz_name_f = await tz.json()
        setTz_name(tz_name_f.tz[0])
        const weather = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latlong[0]}&longitude=${latlong[1]}&hourly=temperature_2m,relativehumitidy_2m,apparent_temperature,precipitation,cloudcover,windspeed_10m,cloudcover,weathercode,winddirection_10m&daily=weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,precipitation_sum,precipitation_hours&timezone=${tz_name_f.tz[0]}`)
        const w = await weather.json()
        setweather(w)
        getdata(w)
    }
    
    const getdata = (w) => {
        let graphdata = []
        for(let i in w.hourly.time){
            graphdata.push({
                unixtime: DateTime.fromISO(w.hourly.time[i]).toMillis(), 
                rawtime: w.hourly.time[i], 
                name: DateTime.fromISO(w.hourly.time[i],{zone: tz_name}).toLocaleString(DateTime.DATETIME_SHORT),
                uv: w.hourly.temperature_2m[i], 
                pv: w.hourly.apparent_temperature[i], 
                cc: w.hourly.cloudcover[i], 
                weathercode: w.hourly.weathercode[i], 
                precipitation: w.hourly.precipitation[i], 
                windspeed: w.hourly.windspeed_10m[i],
                winddirection: w.hourly.winddirection_10m[i],
                humidity: w.hourly.relativehumitidy_2m[i]
            })
    }

        const q = graphdata.sort((a, b) => {
            if(a.unixtime < b.unixtime < 0) return -1
            if(a.unixtime > b.unixtime < 0) return 1
            return 0
        })
        
        setChartData(q)
    }

    return (
        <div style={{"display": "flex", "flexDirection": "column", "width": "100%"}}>
            <div style={{"display": "flex", "flexDirection": "row", "width": "100%"}}>
                <button onClick={() => getweather()} className="bbutton">Get Weather 🌞</button>
                    {!!chartdata ? <Quicksummary chartdata={chartdata} /> : null}
                    <style jsx>{`
                        .bbutton {
                            background-color: skyblue;
                            border: none;
                            padding: 5px;
                            white-space: nowrap; 
                            text-align: center;
                            height: fit-content;
                        }
                    `}</style>
            </div>
        {!!chartdata ? 
            <>
                <div className="graph">
                    <TempHumidityRainGraph chartdata={chartdata} />
                </div>
                <div className="split" >
                    <div className="graph">      
                        <CloudCoverGraph chartdata={chartdata}/>
                    </div>
                    <div className="graph">      
                        <WindSpeedGraph chartdata={chartdata}/>
                    </div>
                    <style jsx>{`
                        .split {
                            display: flex; 
                            flex-direction: row;
                            width: 100%; 
                        }

                        @media (max-width: 1200px) {
                            .split {
                                width: 100%; 
                                flex-direction: column;
                            }
                        }

                        .graph {
                            width: 100%;
                        }

                        .bbutton {
                            background-color: skyblue;
                            border: none;
                            padding: 5px;
                            white-space: "nowrap; 
                            text-align: center;
                            height: fit-content;
                        }
                    `}</style>
                        
                </div>
            <div><WeeklyForcast weather={weather} tz_name={tz_name} /></div>
            </>  
        : null
        }
        </div>
    )
}

export default MainWeather