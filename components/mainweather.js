
import {useState } from 'react';
import React from 'react';
import { XAxis, YAxis, CartesianGrid, Tooltip, Legend, ComposedChart, Bar, Area, ReferenceLine, Brush,BarChart,ResponsiveContainer,Line } from 'recharts';
import { DateTime } from "luxon";
import {useMapProvider} from "./MapProvider";
const desc = {
    "0":    "Clear sky",
    "1": 	"Mainly clear, partly cloudy, and overcast",
    "2":    "Mainly clear, partly cloudy, and overcast",
    "3":    "Mainly clear, partly cloudy, and overcast",
    "45":   "Fog and depositing rime fog",
    "48":   "Fog and depositing rime fog",
    "51":   "Drizzle: Light, moderate, and dense intensity",
    "53":   "Drizzle: Light, moderate, and dense intensity",
    "55":   "Drizzle: Light, moderate, and dense intensity",
    "56":   "Freezing Drizzle: Light and dense intensity",
    "57":   "Freezing Drizzle: Light and dense intensity",
    "61":   "Rain: Slight, moderate and heavy intensity",
    "63":   "Rain: Slight, moderate and heavy intensity",
    "65":   "Rain: Slight, moderate and heavy intensity",
    "66":   "Freezing Rain: Light and heavy intensity",
    "67":   "Freezing Rain: Light and heavy intensity",
    "71":   "Snow fall: Slight, moderate, and heavy intensity",
    "72":   "Snow fall: Slight, moderate, and heavy intensity",
    "75":   "Snow fall: Slight, moderate, and heavy intensity",
    "77":   "Snow grains",
    "80":   "Rain showers: Slight, moderate, and violent",
    "81":   "Rain showers: Slight, moderate, and violent",
    "82":   "Rain showers: Slight, moderate, and violent",
    "85":   "Snow showers slight and heavy",
    "86":   "Snow showers slight and heavy",
    "95":   "Thunderstorm: Slight or moderate",
    "96":   "Thunderstorm with slight and heavy hail",
    "99":   "Thunderstorm with slight and heavy hail"
    }

const desc_icon = {
    0: "clear_day.svg",
    1: "partly_cloudy_day.svg",
    2: "partly_cloudy_day.svg",
    3: "partly_cloudy_day.svg",
    45: "fog.svg",
    48: "fog.svg",
    51: "drizzle.svg",
    53: "drizzle.svg",
    55: "drizzle.svg",
    56: "freezing_drizzle.svg",
    57: "freezing_drizzle.svg",
    61: "rain_light.svg",
    63: "rain_light.svg",
    65: "rain_light.svg",
    66: "freezing_rain.svg",
    67: "freezing_rain.svg",
    71: "snow_light.svg",
    72: "snow_light.svg",
    75: "snow_light.svg",
    77: "ice_pellets_light.svg",
    80: "rain.svg",
    81: "rain.svg",
    82: "rain.svg",
    85: "rain_heavy.svg",
    86: "rain_heavy.svg",
    95: "tstorm.svg",
    96:  "tstorm.svg",
    99:  "tstorm.svg"
}

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
        console.log(w)
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

    const formatXAxis = (xtick) => {
        return xtick
    }

    const closesttime = () => {
        const data = chartdata
        const currtime = DateTime.now().toLocal().toMillis()
        let closest = [...data].sort(function(a, b){
        return Math.abs(currtime-a.unixtime) - Math.abs(currtime-b.unixtime);
        });
        return closest[0].name
    }


    const  renderTooltipTemp = ({ active, payload, label }) => {
        if (!!active) {
            return (
                <div className="custom-tooltip" style={{"backgroundColor": "white", "border": "1px solid silver"}}>
                    <p className="label"><b>{`${label}`}</b></p>
                    {
                        payload.map((point, i) => {
                            return <span key={i} style={{"color": point.stroke}}>{`${point.name}: ${point.value} ${point.unit} `}<br/></span>
                        })
                    }
                    <p className="desc">{desc[payload[0].payload.weathercode]}</p>
                </div>
            );
        }
        return null;
    }


    const  RenderTooltipWind = ({ active, payload, label }) => {
        if (!!active) {
            return (
                <div className="custom-tooltip" style={{"backgroundColor": "white", "border": "1px solid silver"}}>
                    <p className="label"><b>{`${label}`}</b></p>
                    <span style={{"color": payload[0].fill}}>{`${payload[0].name}: ${payload[0].value} ${payload[0].unit} `}</span>
                    <p className="desc">Direction: {payload[0].payload.winddirection}&deg;</p>
                </div>
            );
        }
        return null;
    }
    
    return (
        <div style={{"display": "flex", "flexDirection": "column", "width": "100%"}}>
            <div style={{"display": "flex", "flexDirection": "row", "width": "100%"}}>
                <button onClick={() => getweather()} className="bbutton">Get Weather 🌞</button>
                {!!chartdata ? <Quicksummary chartdata={chartdata} closesttime={closesttime}/> : null}
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
                    <ResponsiveContainer width="100%" height={300}>
                        <ComposedChart
                            data={chartdata}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" angle={5} tickFormatter={formatXAxis} xAxisId="name" />
                            <YAxis width={20} yAxisId="degy" />
                            <YAxis width={20} yAxisId="pcent" />
                            <Tooltip 
                            content={renderTooltipTemp}
                        />
                        <Legend/>
                        <Brush endIndex={chartdata.length / 4} />
                        <Area unit="&deg;C" yAxisId="degy" dataKey="uv" fill="#82ca9d" name="temp" xAxisId="name" type="basis"/>
                        <Area unit="&deg;C" yAxisId="degy" fillOpacity="1" dataKey="pv" fill="#8884d8" activeDot={{ r: 8 }} name="feels like" xAxisId="name" type="basis" connectNulls/>
                        <Bar  unit="mm"     yAxisId="pcent" dataKey="precipitation"  barSize={20} fill="#413ea0" name="precipitation" xAxisId="name" connectNulls/>
                        <Line unit="&deg;C" yAxisId="pcent"  dataKey="humidity" stroke="orange" xAxisId="name" type="basis" connectNulls/>
                        <ReferenceLine x={closesttime()} label="Now" stroke="red" strokeDasharray="3 3" yAxisId="degy" xAxisId="name" />
                        </ComposedChart>
                    </ResponsiveContainer>
                </div>
                <div className="split" >
                    <div className="graph">      
                        <ResponsiveContainer width="100%" height={250}>
                            <BarChart data={chartdata}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" xAxisId="name"/>
                                <YAxis width={20} yAxisId="degy" />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="cc" fill="#82ca9d" name="cloudcover" unit="%"  yAxisId="degy"  xAxisId="name"/>
                                <ReferenceLine x={closesttime()} label="Now" stroke="red" strokeDasharray="3 3" yAxisId="degy"  xAxisId="name"/>
                                <Brush endIndex={chartdata.length / 4} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="graph">      
                        <ResponsiveContainer width="100%" height={250}>
                        <BarChart data={chartdata}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" xAxisId="name"/>
                            <YAxis width={20} yAxisId="degy" />
                            <Tooltip content={RenderTooltipWind} />
                            <Legend />
                            <Bar dataKey="windspeed" fill="#8884d8" name="windspeed" unit="km/h"  yAxisId="degy"  xAxisId="name"/>
                            <ReferenceLine x={closesttime()} label="Now" stroke="red" strokeDasharray="3 3" yAxisId="degy"  xAxisId="name"/>
                            <Brush endIndex={chartdata.length / 4} />
                        </BarChart>
                        </ResponsiveContainer>
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
                                padding": 5px;
                                white-space: "nowrap; 
                                text-align: center;
                                height: fit-content;
                            }
                        `}</style>
                        
                        </div>
                        <div>
                        <WeeklyForcast weather={weather} tz_name={tz_name} />
                        </div>
            </>  
        : null
        }
        
        </div>
    )
}

const Quicksummary = ({chartdata, closesttime}) => {
    const data = chartdata.filter((ele) => ele.name == closesttime())
    return(
        <div style={{"padding-left": "5px"}}>
            <b>
                <span>current temp: {data[0].uv}  (feels like: {data[0].pv}) </span>
                <span>current precipitation: {data[0].precipitation} </span>
                <span>current windspeed: {data[0].windspeed}</span>
            </b>
        </div>
    )
}

const WeeklyForcast = ({weather, tz_name}) => {

    return(
        <div>
        <h1>Forecast:</h1>
        <div className="week">
        {
            weather.daily.time.map((day,index) => {
                return(
                    <div className="day" key={index} style={{"background": `linear-gradient(rgba(255,255,255,0.85), rgba(255,255,255,0.85)), url(/weather_dec/${desc_icon[weather.daily.weathercode[index]]})`}}>
                    <div>
                   <div className="day"><b>{DateTime.fromISO(weather.daily.sunrise[index],{zone: tz_name}).toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY)}</b></div>
                   <div><i>{desc[weather.daily.weathercode[index]]}</i></div> 
                    </div>
                    <div  className="dayitem">
                        <div className="day_title">Max Temp:</div> 
                        <div className="day_value">{weather.daily.apparent_temperature_max[index]}</div>
                        <div className="day_unit">{weather.daily_units.apparent_temperature_max}</div>
                    </div>
                    <div className="dayitem">
                        <div className="day_title">Min Temp:</div> 
                        <div className="day_value">{weather.daily.apparent_temperature_min[index]}</div>  
                        <div className="day_unit">{weather.daily_units.apparent_temperature_min}</div> 
                    </div>
                    <div className="dayitem">
                        <div className="day_title">Rain Total:</div> 
                        <div className="day_value">{weather.daily.precipitation_sum[index]}</div> 
                        <div className="day_unit">{weather.daily_units.precipitation_sum}</div>
                    </div>
                    <div className="dayitem">
                        <div className="day_title">Rain Hours:</div> 
                        <div className="day_value">{weather.daily.precipitation_hours[index]}</div> 
                        <div className="day_unit">{weather.daily_units.precipitation_hours}</div> 
                    </div>
                    <div className="dayitem">
                        <div className="day_title">Sunrise:</div> 
                        <div className="day_value">{DateTime.fromISO(weather.daily.sunrise[index],{zone: tz_name}).toLocaleString(DateTime.TIME_24_SIMPLE)}</div>
                    </div>
                    <div className="dayitem">
                        <div className="day_title">Sunset:</div>  
                        <div className="day_value">{DateTime.fromISO(weather.daily.sunset[index],{zone: tz_name}).toLocaleString(DateTime.TIME_24_SIMPLE)}</div> 
                    </div>
                </div>
                )
            })
        }
        <style jsx>{`
        .dayitem {
            display:flex;
        }

        .day {
            display:flex;
            border: 1px solid black;
            flex-direction: column;
            background-size: cover;
            z-index: -1; 
            width:100%;
        }

        .week {
            border: 1px solid black;
            display: flex; 
            align-content:center; 
        }

        @media (max-width: 1200px) {
            .week {
                width: 100%;
                height:100%; 
                flex-direction: column;
            }

            .day {
                border: 1px solid black;
                min-width:100%;
            }
        }
    `}</style>
        </div>
        </div>
    )
}

export default MainWeather